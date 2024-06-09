import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(
    req: Request & { headers: { authorization: string; host: string } },
    res: Response,
    next: NextFunction,
  ) {
    if (req.headers.host === 'localhost:4000') {
      const accessToken = req.cookies['access-token'];
      if (accessToken) {
        req.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    next();
  }
}
