import { Opportunity } from '@/types';
import { deduplicateOpportunities } from '@/utils/opportunityDeduplication';
import { LIVE_ANNOUNCEMENT_OPPORTUNITIES } from './categories/live_announcements';
import { EXAM_OPPORTUNITIES } from './categories/exams';
import { PRIVATE_JOB_OPPORTUNITIES } from './categories/private_jobs';
import { INTERNSHIP_OPPORTUNITIES } from './categories/internships';
import { EDUCATION_OPPORTUNITIES } from './categories/education';
import { ABROAD_OPPORTUNITIES } from './categories/abroad';
import { CAREER_OPPORTUNITIES } from './categories/career';
import { STARTUP_OPPORTUNITIES } from './categories/startups';
import { SCHEME_OPPORTUNITIES } from './categories/schemes';
import { FREEBIE_OPPORTUNITIES } from './categories/freebies';
import { HEALTH_OPPORTUNITIES } from './categories/health';
import { GLOBAL_STUDY_ABROAD_OPPORTUNITIES } from './categories/global_study_abroad';
import { USA_OPPORTUNITIES } from './categories/usa_opportunities';
import { UK_OPPORTUNITIES } from './categories/uk_opportunities';
import { CANADA_OPPORTUNITIES } from './categories/canada_opportunities';
import { GERMANY_OPPORTUNITIES } from './categories/germany_opportunities';
import { AUSTRALIA_OPPORTUNITIES } from './categories/australia_opportunities';
import { FRANCE_OPPORTUNITIES } from './categories/france_opportunities';
import { JAPAN_OPPORTUNITIES } from './categories/japan_opportunities';
import { UAE_OPPORTUNITIES } from './categories/uae_opportunities';
import { BRAZIL_OPPORTUNITIES } from './categories/brazil_opportunities';
import { SINGAPORE_OPPORTUNITIES } from './categories/singapore_opportunities';
import { SOUTH_KOREA_OPPORTUNITIES } from './categories/south_korea_opportunities';
import { SAUDI_OPPORTUNITIES } from './categories/saudi_opportunities';
import { NEWZEALAND_OPPORTUNITIES } from './categories/newzealand_opportunities';
import { SOUTH_AFRICA_OPPORTUNITIES } from './categories/south_africa_opportunities';
import { ITALY_OPPORTUNITIES } from './categories/italy_opportunities';

// Tag country code on opportunities that don't have one set
const tagCountry = (opps: Opportunity[], countryCode: Opportunity['country']): Opportunity[] => {
  return opps.map((o) => ({
    ...o,
    country: o.country || countryCode || 'IN',
  }));
};

const RAW_INITIAL_OPPORTUNITIES: Opportunity[] = [
  // Live Official Gazette & Government Announcements (Top Priority)
  ...tagCountry(LIVE_ANNOUNCEMENT_OPPORTUNITIES, 'IN'),

  // India Opportunities (Default 'IN')
  ...tagCountry(EXAM_OPPORTUNITIES, 'IN'),
  ...tagCountry(PRIVATE_JOB_OPPORTUNITIES, 'IN'),
  ...tagCountry(INTERNSHIP_OPPORTUNITIES, 'IN'),
  ...tagCountry(EDUCATION_OPPORTUNITIES, 'IN'),
  ...tagCountry(ABROAD_OPPORTUNITIES, 'IN'),
  ...tagCountry(CAREER_OPPORTUNITIES, 'IN'),
  ...tagCountry(STARTUP_OPPORTUNITIES, 'IN'),
  ...tagCountry(SCHEME_OPPORTUNITIES, 'IN'),
  ...tagCountry(FREEBIE_OPPORTUNITIES, 'IN'),
  ...tagCountry(HEALTH_OPPORTUNITIES, 'IN'),
  ...tagCountry(GLOBAL_STUDY_ABROAD_OPPORTUNITIES, 'IN'),

  // International Country-Specific Opportunities
  ...USA_OPPORTUNITIES,
  ...UK_OPPORTUNITIES,
  ...CANADA_OPPORTUNITIES,
  ...GERMANY_OPPORTUNITIES,
  ...AUSTRALIA_OPPORTUNITIES,
  ...FRANCE_OPPORTUNITIES,
  ...JAPAN_OPPORTUNITIES,
  ...UAE_OPPORTUNITIES,
  ...BRAZIL_OPPORTUNITIES,
  ...SINGAPORE_OPPORTUNITIES,
  ...SOUTH_KOREA_OPPORTUNITIES,
  ...SAUDI_OPPORTUNITIES,
  ...NEWZEALAND_OPPORTUNITIES,
  ...SOUTH_AFRICA_OPPORTUNITIES,
  ...ITALY_OPPORTUNITIES,
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = deduplicateOpportunities(RAW_INITIAL_OPPORTUNITIES);
