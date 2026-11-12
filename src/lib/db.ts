import { MongoClient, Db } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { CountryCode, CitizenSubscription } from '@/types';

const CITIZENS_FILE = 'citizens_store.json';
const FAVORITES_FILE = 'favorites_store.json';
const FAMILY_FILE = 'family_store.json';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const defaultDataDir = path.join(process.cwd(), 'src', 'data');
const serverlessDataDir = '/tmp';

// -------------------------------------------------------------
// HIGH-SPEED IN-MEMORY CACHE (0ms sub-millisecond local reads)
// -------------------------------------------------------------
let memoryCitizensCache: CitizenRecord[] | null = null;
let memoryFavoritesCache: Record<string, string[]> | null = null;
let memoryFamilyCache: any[] | null = null;

// MongoDB Connection Caching for Serverless Next.js
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const DEFAULT_MONGODB_URI =
  'mongodb+srv://citizenlifeos:CHALNIKAL01@citizenlifeos.cxdc4r0.mongodb.net/citizen_life_os?retryWrites=true&w=majority';
const uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

export const isMongoConfigured = (): boolean => {
  return Boolean(uri && (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')));
};

// Reliable production MongoDB connection configuration
const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  maxPoolSize: 20,
  minPoolSize: 1,
  maxIdleTimeMS: 60000,
};

function getClientPromise(): Promise<MongoClient> | null {
  if (!isMongoConfigured()) return null;
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, MONGO_OPTIONS);
    global._mongoClientPromise = client.connect().catch((err) => {
      console.warn('MongoDB Atlas connection initial warning:', err?.message);
      global._mongoClientPromise = undefined;
      throw err;
    });
  }
  return global._mongoClientPromise;
}

export async function getMongoDb(): Promise<Db | null> {
  const promise = getClientPromise();
  if (!promise) return null;

  try {
    const client = await promise;
    if (!client) return null;
    return client.db(process.env.MONGODB_DB_NAME || 'citizen_life_os');
  } catch (err: any) {
    console.warn('getMongoDb connection note:', err?.message);
    global._mongoClientPromise = undefined;
    return null;
  }
}

function getStoragePaths(fileName: string): { readPath: string; writePath: string } {
  if (isServerless) {
    return {
      readPath: path.join(serverlessDataDir, fileName),
      writePath: path.join(serverlessDataDir, fileName),
    };
  }
  const local = path.join(defaultDataDir, fileName);
  return { readPath: local, writePath: local };
}

// Local File System Helper Fallbacks
async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  const { readPath } = getStoragePaths(fileName);
  try {
    const raw = await fs.readFile(readPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (isServerless) {
      try {
        const bundlePath = path.join(defaultDataDir, fileName);
        const rawBundle = await fs.readFile(bundlePath, 'utf-8');
        const parsed = JSON.parse(rawBundle);
        try {
          await fs.writeFile(readPath, rawBundle, 'utf-8');
        } catch {}
        return parsed;
      } catch {}
    }
    return fallback;
  }
}

async function writeJsonFile(fileName: string, data: any): Promise<void> {
  const { writePath } = getStoragePaths(fileName);
  try {
    await fs.writeFile(writePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`Local store file write note (${writePath}):`, err);
  }
}

async function getCitizensLocal(): Promise<CitizenRecord[]> {
  if (memoryCitizensCache !== null) {
    return memoryCitizensCache;
  }
  const loaded = await readJsonFile<CitizenRecord[]>(CITIZENS_FILE, []);
  memoryCitizensCache = loaded;
  return loaded;
}

async function persistCitizensLocal(citizens: CitizenRecord[]): Promise<void> {
  memoryCitizensCache = citizens;
  writeJsonFile(CITIZENS_FILE, citizens).catch(() => {});
}

async function getFavoritesLocal(): Promise<Record<string, string[]>> {
  if (memoryFavoritesCache !== null) {
    return memoryFavoritesCache;
  }
  const loaded = await readJsonFile<Record<string, string[]>>(FAVORITES_FILE, {});
  memoryFavoritesCache = loaded;
  return loaded;
}

async function persistFavoritesLocal(favs: Record<string, string[]>): Promise<void> {
  memoryFavoritesCache = favs;
  writeJsonFile(FAVORITES_FILE, favs).catch(() => {});
}

async function getFamilyLocal(): Promise<any[]> {
  if (memoryFamilyCache !== null) {
    return memoryFamilyCache;
  }
  const loaded = await readJsonFile<any[]>(FAMILY_FILE, []);
  memoryFamilyCache = loaded;
  return loaded;
}

async function persistFamilyLocal(family: any[]): Promise<void> {
  memoryFamilyCache = family;
  writeJsonFile(FAMILY_FILE, family).catch(() => {});
}

// -------------------------------------------------------------
// UNIFIED DATA REPOSITORY (Auto-switches Cloud DB & Local Store)
// -------------------------------------------------------------

export interface CitizenRecord {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  country?: CountryCode;
  nationalIdName?: string;
  nationalIdMasked?: string;
  aadhaarNumberMasked?: string;
  aadhaarNumber?: string;
  age: number;
  dob?: string;
  gender: 'male' | 'female' | 'other';
  state: string;
  administrativeDivision?: string;
  district?: string;
  pincode?: string;
  lifePhase: string;
  casteCategory: string;
  familyIncomeAnnual?: number;
  educationLevel?: string;
  qualification?: string;
  photoURL?: string;
  registeredAt: string;
  status: 'verified';
  isOnboarded?: boolean;
  isAadhaarVerified?: boolean;
  isCardVerified?: boolean;
  subscription?: CitizenSubscription;
  notificationsEnabled?: {
    webPush?: boolean;
    whatsApp?: boolean;
    urgentDeadlinesOnly?: boolean;
  };
  passwordHash?: string;
  passwordSalt?: string;
}

export function hashCitizenPassword(password: string, customSalt?: string): { hash: string; salt: string } {
  const salt = customSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyCitizenPassword(password: string, hash: string, salt: string): boolean {
  if (!password || !hash || !salt) return false;
  try {
    const computedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(computedHash, 'hex'), Buffer.from(hash, 'hex'));
  } catch (e) {
    return false;
  }
}

export const DatabaseService = {
  /**
   * Find a registered citizen by email, phone, ID, or transactionId (Instant 0ms lookup)
   */
  /**
   * Find a registered citizen by email, phone, ID, or transactionId (Real-time Cloud + Fast Local)
   */
  async findCitizen(filter: { email?: string; phone?: string; id?: string; transactionId?: string }): Promise<CitizenRecord | null> {
    const email = filter.email?.trim().toLowerCase();
    const phone = filter.phone?.replace(/\D/g, '').slice(-10);
    const id = filter.id?.trim();
    const transactionId = filter.transactionId?.trim();

    // 1. PRIMARY: Query MongoDB first so newly registered or upgraded paid status is 100% accurate
    try {
      const db = await getMongoDb();
      if (db) {
        const conditions: any[] = [];
        if (email) conditions.push({ email: email });
        if (phone) conditions.push({ phoneNumber: phone });
        if (transactionId) conditions.push({ 'subscription.transactionId': transactionId });
        if (id) {
          conditions.push({ id: id });
          conditions.push({ nationalIdMasked: id });
          conditions.push({ aadhaarNumberMasked: id });
        }

        if (conditions.length > 0) {
          const cloudMatch = await db.collection<CitizenRecord>('citizens').findOne({ $or: conditions });
          if (cloudMatch) {
            // Keep local cache in sync
            const local = await getCitizensLocal();
            const idx = local.findIndex((c) => c.id === cloudMatch.id || (email && c.email?.toLowerCase() === email));
            if (idx >= 0) {
              local[idx] = cloudMatch;
            } else {
              local.unshift(cloudMatch);
            }
            return cloudMatch;
          }
        }
      }
    } catch (err: any) {
      console.warn('MongoDB findCitizen note:', err?.message);
    }

    // 2. FALLBACK: Check memory cache / local JSON store
    const citizens = await getCitizensLocal();
    return citizens.find((c) => {
      if (email && c.email?.toLowerCase() === email) return true;
      if (phone && c.phoneNumber === phone) return true;
      if (transactionId && c.subscription?.transactionId === transactionId) return true;
      if (id && (c.id === id || c.nationalIdMasked === id || c.aadhaarNumberMasked === id)) return true;
      return false;
    }) || null;
  },

  /**
   * Save or update citizen profile (Awaited Cloud Write + Instant Local Memory Cache)
   */
  async saveCitizen(citizen: CitizenRecord): Promise<CitizenRecord> {
    const email = citizen.email?.trim().toLowerCase();
    const phone = citizen.phoneNumber?.replace(/\D/g, '').slice(-10);

    // 1. INSTANT LOCAL UPDATE: Update memory cache
    const citizens = await getCitizensLocal();
    const idx = citizens.findIndex((c) => {
      if (email && c.email?.toLowerCase() === email) return true;
      if (phone && c.phoneNumber === phone) return true;
      if (citizen.id && c.id === citizen.id) return true;
      return false;
    });

    if (idx >= 0) {
      citizens[idx] = { ...citizens[idx], ...citizen };
    } else {
      citizens.unshift(citizen);
    }
    await persistCitizensLocal(citizens);

    // 2. RELIABLE CLOUD SYNC: Awaited so MongoDB always has the exact up-to-date state immediately
    try {
      const db = await getMongoDb();
      if (db) {
        const conditions: any[] = [];
        if (email) conditions.push({ email: email });
        if (phone) conditions.push({ phoneNumber: phone });
        if (citizen.id) conditions.push({ id: citizen.id });

        const filter = conditions.length > 0 ? { $or: conditions } : { id: citizen.id };

        await db.collection('citizens').updateOne(filter, { $set: citizen }, { upsert: true });
      }
    } catch (err: any) {
      console.warn('MongoDB cloud sync notice:', err?.message);
    }

    return citizen;
  },

  /**
   * Get all registered citizens (Real-time MongoDB Atlas query with local fallback)
   */
  async getAllCitizens(): Promise<CitizenRecord[]> {
    // 1. PRIMARY: Query MongoDB directly and await real-time data
    try {
      const db = await getMongoDb();
      if (db) {
        const cloud = await db
          .collection<CitizenRecord>('citizens')
          .find({})
          .sort({ registeredAt: -1 })
          .toArray();

        if (Array.isArray(cloud)) {
          // Merge with any offline local records if any
          const local = await getCitizensLocal();
          const map = new Map<string, CitizenRecord>();
          // Cloud records take precedence as source of truth
          for (const c of cloud) {
            const key = (c.email?.toLowerCase() || c.phoneNumber || c.id || '').trim();
            if (key) map.set(key, c);
          }
          // If local has offline-only created records, include them
          for (const c of local) {
            const key = (c.email?.toLowerCase() || c.phoneNumber || c.id || '').trim();
            if (key && !map.has(key)) map.set(key, c);
          }

          const merged = Array.from(map.values());
          merged.sort(
            (a, b) => new Date(b.registeredAt || 0).getTime() - new Date(a.registeredAt || 0).getTime()
          );
          memoryCitizensCache = merged;
          writeJsonFile(CITIZENS_FILE, merged).catch(() => {});
          return merged;
        }
      }
    } catch (err: any) {
      console.warn('MongoDB getAllCitizens query warning:', err?.message);
    }

    // 2. FALLBACK: Return local file store if MongoDB is offline
    return await getCitizensLocal();
  },

  /**
   * Get saved favorites for a citizen (Instant local lookup)
   */
  async getFavorites(key: string): Promise<string[]> {
    if (!key) return [];
    const cleanKey = key.trim().toLowerCase();

    const allFavorites = await getFavoritesLocal();
    if (allFavorites[cleanKey] || allFavorites[key]) {
      return allFavorites[cleanKey] || allFavorites[key] || [];
    }

    const db = await getMongoDb();
    if (db) {
      try {
        const doc = await db.collection('favorites').findOne({ key: cleanKey });
        if (doc && Array.isArray(doc.favorites)) {
          allFavorites[cleanKey] = doc.favorites;
          await persistFavoritesLocal(allFavorites);
          return doc.favorites;
        }
      } catch (err) {}
    }

    return [];
  },

  /**
   * Save favorites for a citizen (Instant local save + background cloud sync)
   */
  async saveFavorites(key: string, favorites: string[]): Promise<void> {
    if (!key) return;
    const cleanKey = key.trim().toLowerCase();

    const allFavorites = await getFavoritesLocal();
    allFavorites[cleanKey] = favorites;
    await persistFavoritesLocal(allFavorites);

    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection('favorites').updateOne(
          { key: cleanKey },
          { $set: { key: cleanKey, favorites, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );
      }
    } catch (err: any) {
      console.warn('MongoDB favorites sync notice:', err?.message);
    }
  },

  /**
   * Get family members for a citizen (Instant local lookup)
   */
  async getFamilyMembers(filter: { email?: string; phone?: string }): Promise<any[]> {
    const email = filter.email?.trim().toLowerCase();
    const phone = filter.phone?.replace(/\D/g, '').slice(-10);
    if (!email && !phone) return [];

    const allMembers = await getFamilyLocal();
    const matches = allMembers.filter((m) => {
      if (email && m.citizenEmail?.toLowerCase() === email) return true;
      if (phone && m.citizenPhone === phone) return true;
      return false;
    });

    if (matches.length > 0) return matches;

    const db = await getMongoDb();
    if (db) {
      try {
        const query: any = {};
        const orConditions: any[] = [];
        if (email) orConditions.push({ citizenEmail: email });
        if (phone) orConditions.push({ citizenPhone: phone });
        query.$or = orConditions;

        const cloudMembers = await db.collection('family').find(query).toArray();
        if (cloudMembers && cloudMembers.length > 0) {
          for (const cm of cloudMembers) {
            if (!allMembers.some((m) => m.id === cm.id)) {
              allMembers.push(cm);
            }
          }
          await persistFamilyLocal(allMembers);
          return cloudMembers;
        }
      } catch (err) {}
    }

    return [];
  },

  /**
   * Save or update a family member (Instant local save + background cloud sync)
   */
  async saveFamilyMember(member: any): Promise<any> {
    const allMembers = await getFamilyLocal();
    const idx = allMembers.findIndex((m) => m.id === member.id);
    if (idx >= 0) {
      allMembers[idx] = member;
    } else {
      allMembers.push(member);
    }
    await persistFamilyLocal(allMembers);

    getMongoDb()
      .then((db) => {
        if (!db) return;
        return db.collection('family').updateOne({ id: member.id }, { $set: member }, { upsert: true });
      })
      .catch(() => {});

    return member;
  },

  /**
   * Delete a family member belonging to the citizen (Instant local delete + background sync)
   */
  async deleteFamilyMember(memberId: string, filter: { email?: string; phone?: string }): Promise<boolean> {
    const email = filter.email?.trim().toLowerCase();
    const phone = filter.phone?.replace(/\D/g, '').slice(-10);

    const allMembers = await getFamilyLocal();
    const filtered = allMembers.filter((m) => {
      if (m.id !== memberId) return true;
      if (email && m.citizenEmail?.toLowerCase() === email) return false;
      if (phone && m.citizenPhone === phone) return false;
      return true;
    });
    await persistFamilyLocal(filtered);

    getMongoDb()
      .then((db) => {
        if (!db) return;
        const deleteQuery: any = { id: memberId };
        const orConditions: any[] = [];
        if (email) orConditions.push({ citizenEmail: email });
        if (phone) orConditions.push({ citizenPhone: phone });
        if (orConditions.length > 0) deleteQuery.$or = orConditions;
        return db.collection('family').deleteOne(deleteQuery);
      })
      .catch(() => {});

    return true;
  },
};
