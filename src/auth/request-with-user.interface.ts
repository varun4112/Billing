import { Request } from 'express';

/**
 * JWT payload shape set in AuthService.login (userId, tenantId, role).
 * Passport JWT strategy assigns this to req.user after validation.
 */
export interface JwtPayload {
  userId: string;
  tenantId: string;
  role: string;
}

/**
 * Express Request extended with Passport-assigned user from JWT.
 * Use this type in controllers that use JwtAuthGuard.
 */
export interface RequestWithUser extends Request {
  user: JwtPayload;
}
