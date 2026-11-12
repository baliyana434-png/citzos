/**
 * =======================================================================
 * CITIZOS ENTERPRISE ROLE-BASED ACCESS CONTROL (RBAC) ENGINE
 * =======================================================================
 * Strictly enforces least-privilege permission validation on all
 * administrative endpoints and operational procedures.
 * =======================================================================
 */

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'READ_ONLY_ADMIN';

export type AdminPermission =
  | 'VIEW_CITIZENS'
  | 'VIEW_UNMASKED_AADHAAR'
  | 'EXPORT_CITIZENS_DATA'
  | 'MODIFY_CITIZENS'
  | 'VIEW_OPPORTUNITIES'
  | 'TRIGGER_CRAWLER'
  | 'SEND_PUSH_BROADCAST'
  | 'VIEW_SYSTEM_TELEMETRY'
  | 'VIEW_AUDIT_LOGS'
  | 'MANAGE_ADMIN_ROLES';

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  SUPER_ADMIN: [
    'VIEW_CITIZENS',
    'VIEW_UNMASKED_AADHAAR',
    'EXPORT_CITIZENS_DATA',
    'MODIFY_CITIZENS',
    'VIEW_OPPORTUNITIES',
    'TRIGGER_CRAWLER',
    'SEND_PUSH_BROADCAST',
    'VIEW_SYSTEM_TELEMETRY',
    'VIEW_AUDIT_LOGS',
    'MANAGE_ADMIN_ROLES',
  ],
  ADMIN: [
    'VIEW_CITIZENS',
    'VIEW_UNMASKED_AADHAAR',
    'EXPORT_CITIZENS_DATA',
    'MODIFY_CITIZENS',
    'VIEW_OPPORTUNITIES',
    'TRIGGER_CRAWLER',
    'SEND_PUSH_BROADCAST',
    'VIEW_SYSTEM_TELEMETRY',
    'VIEW_AUDIT_LOGS',
  ],
  MODERATOR: [
    'VIEW_CITIZENS',
    'VIEW_OPPORTUNITIES',
    'TRIGGER_CRAWLER',
    'VIEW_SYSTEM_TELEMETRY',
  ],
  READ_ONLY_ADMIN: [
    'VIEW_CITIZENS',
    'VIEW_OPPORTUNITIES',
    'VIEW_SYSTEM_TELEMETRY',
    'VIEW_AUDIT_LOGS',
  ],
};

export class RBACService {
  /**
   * Check if a given role possesses a specific permission
   */
  static hasPermission(role: AdminRole, permission: AdminPermission): boolean {
    const permissions = ROLE_PERMISSIONS[role];
    if (!permissions) return false;
    return permissions.includes(permission);
  }

  /**
   * Get all permissions granted to a role
   */
  static getPermissions(role: AdminRole): AdminPermission[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Validate role string safely
   */
  static sanitizeRole(roleStr: unknown): AdminRole {
    if (typeof roleStr !== 'string') return 'READ_ONLY_ADMIN';
    const upper = roleStr.toUpperCase().trim();
    if (upper === 'SUPER_ADMIN' || upper === 'ADMIN' || upper === 'MODERATOR' || upper === 'READ_ONLY_ADMIN') {
      return upper as AdminRole;
    }
    return 'READ_ONLY_ADMIN';
  }
}
