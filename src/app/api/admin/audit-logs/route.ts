import { NextRequest, NextResponse } from 'next/server';
import { AdminSecurityService, ADMIN_COOKIE_NAME } from '@/lib/security';
import { SecurityAuditLogger } from '@/lib/auditLogger';
import { RBACService } from '@/lib/rbac';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  // Check signed session cookie or custom header
  const cookieToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const headerToken = req.headers.get('x-admin-token');
  const token = cookieToken || headerToken;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  const session = AdminSecurityService.verifyAdminSession(token);
  if (!session.valid || !session.role) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired administrative session.' },
      { status: 401 }
    );
  }

  // Check RBAC permission for viewing audit logs
  if (!RBACService.hasPermission(session.role, 'VIEW_AUDIT_LOGS')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Insufficient RBAC clearance for security audit logs.' },
      { status: 403 }
    );
  }

  try {
    const logs = await SecurityAuditLogger.getRecentLogs(100);
    return NextResponse.json(
      {
        success: true,
        count: logs.length,
        logs,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch audit logs.' },
      { status: 500 }
    );
  }
}
