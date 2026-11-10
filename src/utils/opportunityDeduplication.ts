import { Opportunity } from '@/types';

/**
 * Opportunity Deduplication & Canonical Resolution Engine
 * Guarantees that no duplicate, near-identical, or repeated opportunities
 * can ever be displayed to citizens across any feed, search result, or category section.
 */

// Known canonical schemes / examinations / opportunities
const CANONICAL_SCHEME_PATTERNS: [RegExp, string][] = [
  [/surya\s*ghar/i, 'pm-surya-ghar'],
  [/ayushman\s*bharat|pm-?jay/i, 'ayushman-bharat-pmjay'],
  [/aicte.*internship/i, 'aicte-national-internship'],
  [/pragati.*(scholarship|saksham)|saksham.*scholarship/i, 'aicte-pragati-scholarship'],
  [/chevening/i, 'chevening-scholarship'],
  [/national\s*overseas\s*scholarship|nos\s*msje/i, 'national-overseas-scholarship'],
  [/erasmus\s*mundus/i, 'erasmus-mundus-masters'],
  [/agniveer|armed\s*forces.*recruit/i, 'indian-armed-forces-agniveer'],
  [/navy.*(10\+2|b\.?tech|cadet|ssr|mr)/i, 'indian-navy-cadet-ssr'],
  [/neet\s*ug/i, 'nta-neet-ug'],
  [/jee\s*main/i, 'nta-jee-main'],
  [/upsc\s*(civil\s*services|cse)/i, 'upsc-civil-services-cse'],
  [/rrb.*(ntpc|station\s*master|commercial\s*apprentice)/i, 'railway-rrb-ntpc'],
  [/pm\s*kisan/i, 'pm-kisan-samman-nidhi'],
  [/pm\s*vishwakarma.*(tailor|sewing|silai)/i, 'pm-vishwakarma-silai-machine'],
  [/pm\s*vishwakarma/i, 'pm-vishwakarma-yojana'],
  [/pm\s*mudra/i, 'pm-mudra-yojana'],
  [/pm\s*egp|prime\s*minister.*employment\s*generation/i, 'pmegp-scheme'],
  [/stand\s*up\s*india/i, 'stand-up-india-scheme'],
  [/startup\s*india\s*seed\s*fund/i, 'startup-india-seed-fund'],
  [/ssc\s*cgl/i, 'ssc-cgl-exam'],
  [/ssc\s*chsl/i, 'ssc-chsl-exam'],
  [/ibps\s*po/i, 'ibps-probationary-officer'],
  [/sbi\s*po/i, 'sbi-probationary-officer'],
  [/rbi\s*grade\s*b/i, 'rbi-grade-b-officer'],
  [/eiffel\s*excellence/i, 'france-eiffel-excellence'],
  [/daad.*(scholarship|research|helmut)/i, 'germany-daad-scholarship'],
  [/mext\s*japan/i, 'japan-mext-scholarship'],
  [/turkiye\s*burslari/i, 'turkiye-burslari-scholarship'],
];

// Domains that are generic and should not trigger a URL-based duplicate match on their own
const GENERIC_HOSTS = new Set([
  'google.com',
  'drive.google.com',
  'docs.google.com',
  'forms.gle',
  't.me',
  'youtube.com',
  'linkedin.com',
  'gov.in',
  'nic.in',
  'gov.uk',
  'canada.ca',
  'australia.gov.au',
  'service-public.fr',
  'go.jp',
]);

/**
 * Extracts normalized hostname from official portal URL
 */
function extractPortalHost(url?: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    if (GENERIC_HOSTS.has(host) || host.length < 5) {
      return '';
    }
    return host;
  } catch {
    return '';
  }
}

/**
 * Returns canonical key for well-known schemes / programs
 */
function getCanonicalEntityKey(title: string): string | null {
  for (const [pattern, key] of CANONICAL_SCHEME_PATTERNS) {
    if (pattern.test(title)) {
      return key;
    }
  }
  return null;
}

/**
 * Normalizes title for string matching (lowercased, year removed, punctuation removed)
 */
function normalizeTitle(title: string): string {
  return (title || '')
    .toLowerCase()
    .replace(/202[4-9]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Normalizes ID by removing common prefixes
 */
function normalizeId(id: string): string {
  return (id || '')
    .toLowerCase()
    .replace(/^(live|crawled|pib|opp|gov)-+/g, '')
    .trim();
}

/**
 * Tokenizes title for Jaccard similarity comparison
 */
function getSignificantTokens(title: string): Set<string> {
  const words = (title || '').toLowerCase().match(/[a-z0-9]+/g) || [];
  const stopWords = new Set([
    '2024', '2025', '2026', '2027', 'the', 'a', 'an', 'in', 'of', 'for', 'to', 'and', 'with',
    'up', 'direct', 'dbt', 'scheme', 'yojana', 'portal', 'recruitment', 'intake', 'lakh', 'crore',
    'free', 'cashless', 'admission', 'exam', 'examination', 'national', 'government', 'bharat', 'sarkar'
  ]);
  const tokens = new Set<string>();
  for (const w of words) {
    if (w.length > 2 && !stopWords.has(w)) {
      tokens.add(w);
    }
  }
  return tokens;
}

/**
 * Calculates Jaccard token similarity between two titles
 */
function calculateJaccardSimilarity(tokensA: Set<string>, tokensB: Set<string>): number {
  if (tokensA.size === 0 || tokensB.size === 0) return 0;
  let intersection = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersection++;
    }
  }
  const union = tokensA.size + tokensB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

/**
 * Merges two duplicate opportunities, keeping the richer / newest version
 */
function mergeDuplicateOpportunities(primary: Opportunity, secondary: Opportunity): Opportunity {
  return {
    ...secondary,
    ...primary,
    // Ensure isNew flag is retained if either had it
    isNew: primary.isNew || secondary.isNew,
    // Keep highest benefit amount
    benefitAmount: Math.max(primary.benefitAmount || 0, secondary.benefitAmount || 0) || primary.benefitAmount,
    // Keep longest description
    description: (primary.description?.length || 0) >= (secondary.description?.length || 0)
      ? primary.description
      : secondary.description,
    descriptionHi: (primary.descriptionHi?.length || 0) >= (secondary.descriptionHi?.length || 0)
      ? primary.descriptionHi
      : secondary.descriptionHi,
    // Keep most complete documents array
    documents: (primary.documents?.length || 0) >= (secondary.documents?.length || 0)
      ? primary.documents
      : secondary.documents,
    // Keep most complete applySteps array
    applySteps: (primary.applySteps?.length || 0) >= (secondary.applySteps?.length || 0)
      ? primary.applySteps
      : secondary.applySteps,
  };
}

/**
 * Evaluates whether two opportunities represent the exact same program, circular, or scheme.
 */
export function isDuplicateOpportunity(a: Opportunity, b: Opportunity): boolean {
  if (a.id === b.id) return true;

  // Normalized ID match
  const normIdA = normalizeId(a.id);
  const normIdB = normalizeId(b.id);
  if (normIdA && normIdA === normIdB) return true;

  // Canonical entity match within same country (or global)
  const entityA = getCanonicalEntityKey(a.title);
  const entityB = getCanonicalEntityKey(b.title);
  if (entityA && entityB && entityA === entityB) {
    const countryA = a.country || 'IN';
    const countryB = b.country || 'IN';
    // If either is global or both belong to the same country
    if (countryA === countryB || a.lifeStage === 'abroad_jobs' || b.lifeStage === 'abroad_jobs') {
      return true;
    }
  }

  // Circular Number match
  const circA = (a.gazette?.circularNumber || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const circB = (b.gazette?.circularNumber || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  if (circA.length >= 8 && circB.length >= 8 && circA === circB) {
    return true;
  }

  // Exact normalized title match
  const normTitleA = normalizeTitle(a.title);
  const normTitleB = normalizeTitle(b.title);
  if (normTitleA.length >= 8 && normTitleA === normTitleB) {
    return true;
  }

  // Official Portal Host match with same category or title keyword overlap
  const hostA = extractPortalHost(a.gazette?.officialPortalUrl);
  const hostB = extractPortalHost(b.gazette?.officialPortalUrl);
  if (hostA && hostB && hostA === hostB) {
    // Check if category matches or title overlap is high
    if (a.category === b.category || a.lifeStage === b.lifeStage) {
      const tokensA = getSignificantTokens(a.title);
      const tokensB = getSignificantTokens(b.title);
      if (calculateJaccardSimilarity(tokensA, tokensB) >= 0.40) {
        return true;
      }
    }
  }

  // High token Jaccard similarity in the same category or life stage
  if (a.lifeStage === b.lifeStage || a.category === b.category) {
    const tokensA = getSignificantTokens(a.title);
    const tokensB = getSignificantTokens(b.title);
    if (calculateJaccardSimilarity(tokensA, tokensB) >= 0.70) {
      return true;
    }
  }

  return false;
}

/**
 * Deduplicates an array of opportunities.
 * Returns a clean array where every item is 100% unique.
 * Preserves the ordering, with earlier (higher priority / live) items taking precedence.
 */
export function deduplicateOpportunities(opportunities: Opportunity[]): Opportunity[] {
  if (!Array.isArray(opportunities) || opportunities.length <= 1) {
    return opportunities || [];
  }

  const result: Opportunity[] = [];
  const seenIds = new Set<string>();
  const seenNormalizedIds = new Set<string>();
  const seenEntities = new Set<string>();
  const seenNormalizedTitles = new Set<string>();
  const seenCirculars = new Set<string>();

  for (const opp of opportunities) {
    if (!opp || !opp.id || !opp.title) continue;

    // 1. Direct ID check
    if (seenIds.has(opp.id)) {
      continue;
    }

    // 2. Normalized ID check
    const normId = normalizeId(opp.id);
    if (normId && seenNormalizedIds.has(normId)) {
      continue;
    }

    // 3. Known Canonical Entity check
    const entityKey = getCanonicalEntityKey(opp.title);
    const countryKey = `${opp.country || 'IN'}:${entityKey}`;
    if (entityKey && (seenEntities.has(entityKey) || seenEntities.has(countryKey))) {
      continue;
    }

    // 4. Circular Number check
    const circ = (opp.gazette?.circularNumber || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    if (circ.length >= 8 && seenCirculars.has(circ)) {
      continue;
    }

    // 5. Normalized Title check
    const normTitle = normalizeTitle(opp.title);
    if (normTitle.length >= 8 && seenNormalizedTitles.has(normTitle)) {
      continue;
    }

    // 6. Deep pairwise fuzzy check against already accepted opportunities
    let duplicateOfIndex = -1;
    for (let i = 0; i < result.length; i++) {
      if (isDuplicateOpportunity(result[i], opp)) {
        duplicateOfIndex = i;
        break;
      }
    }

    if (duplicateOfIndex !== -1) {
      // Merge with the existing item if current has newer/richer information
      result[duplicateOfIndex] = mergeDuplicateOpportunities(result[duplicateOfIndex], opp);
      continue;
    }

    // Unique opportunity accepted
    result.push(opp);
    seenIds.add(opp.id);
    if (normId) seenNormalizedIds.add(normId);
    if (entityKey) {
      seenEntities.add(entityKey);
      seenEntities.add(countryKey);
    }
    if (circ.length >= 8) seenCirculars.add(circ);
    if (normTitle.length >= 8) seenNormalizedTitles.add(normTitle);
  }

  return result;
}
