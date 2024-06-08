import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(
    req: Request & { headers: { authorization: string } },
    res: Response,
    next: NextFunction,
  ) {
    const accessToken = req.cookies['access-token'];
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }
    next();
  }
}
