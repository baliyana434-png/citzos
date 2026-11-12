import { getMongoDb } from '@/lib/db';
import { AdminRole } from '@/lib/rbac';

/**
 * =======================================================================
 * CITIZOS ENTERPRISE TAMPER-RESISTANT SECURITY AUDIT TRAIL
 * =======================================================================
 * Persists critical administrative actions, security anomalies, and access
 * attempts to an immutable MongoDB collection.
 * =======================================================================
 */

export type SecurityAuditEventType =
  | 'ADMIN_LOGIN_SUCCESS'
  | 'ADMIN_LOGIN_FAILED'
  | 'ADMIN_LOGOUT'
  | 'ADMIN_LOCKOUT_TRIGGERED'
  | 'CITIZEN_DOSSIER_VIEWED'
  | 'CITIZEN_BULK_EXPORT'
  | 'PUSH_NOTIFICATION_BROADCAST'
  | 'UNAUTHORIZED_ADMIN_API_ACCESS'
  | 'SYSTEM_STATUS_INSPECTED'
  | 'CRAWLER_MANUALLY_TRIGGERED';

export interface SecurityAuditLogEntry {
  id?: string;
  timestamp: string;
  eventType: SecurityAuditEventType;
  adminIdentifier: string;
  role: AdminRole | 'UNAUTHENTICATED';
  ipAddress: string;
  userAgent?: string;
  resourcePath: string;
  outcome: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  details?: Record<string, any>;
}

export class SecurityAuditLogger {
  /**
   * Records a security event to persistent MongoDB Atlas collection
   */
  static async record(entry: Omit<SecurityAuditLogEntry, 'timestamp'>): Promise<void> {
    const fullEntry: SecurityAuditLogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection('security_audit_logs').insertOne(fullEntry);
      }
    } catch (err: any) {
      console.warn('Security audit logging warning:', err?.message);
    }
  }

  /**
   * Retrieves the most recent security audit logs for the admin compliance dashboard
   */
  static async getRecentLogs(limit: number = 50): Promise<SecurityAuditLogEntry[]> {
    try {
      const db = await getMongoDb();
      if (db) {
        const logs = await db
          .collection<SecurityAuditLogEntry>('security_audit_logs')
          .find({})
          .sort({ timestamp: -1 })
          .limit(limit)
          .toArray();

        return logs.map((log) => ({
          ...log,
          id: (log as any)._id?.toString() || log.id,
        }));
      }
    } catch (err: any) {
      console.warn('Failed to retrieve security audit logs:', err?.message);
    }

    return [];
  }
}
