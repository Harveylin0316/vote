import { Request } from 'express'
import { JWTPayload } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: JWTPayload
}
