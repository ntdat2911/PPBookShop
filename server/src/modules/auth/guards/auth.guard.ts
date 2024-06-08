import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isJWT } from 'class-validator';
import { Request } from 'express-serve-static-core';

import { TokenTypeEnum } from '../../jwt/enums/token-type.enum';
import { JwtService } from '../../jwt/jwt.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { isNull, isUndefined } from 'src/modules/common/consts/validation.util';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const type = context.getType();
    let req;
    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else {
      req = GqlExecutionContext.create(context).getContext().req;
    }
    const activate = await this.setHttpHeader(req, isPublic);

    if (!activate) {
      const httpContext = context.switchToHttp();
      const response = httpContext.getResponse();
      response.redirect('/admin/login');
      return false;
    }

    return activate;
  }

  /**
   * Sets HTTP Header
   *
   * Checks if the header has a valid Bearer token, validates it and sets the User ID as the user.
   */
  private async setHttpHeader(
    req: Request,
    isPublic: boolean,
  ): Promise<boolean> {
    const auth = req.headers?.authorization;
    if (isUndefined(auth) || isNull(auth) || auth.length === 0) {
      return isPublic;
    }

    const authArr = auth.split(' ');
    const bearer = authArr[0];
    const token = authArr[1];

    if (isUndefined(bearer) || isNull(bearer) || bearer !== 'Bearer') {
      return isPublic;
    }
    if (isUndefined(token) || isNull(token) || !isJWT(token)) {
      return isPublic;
    }
    try {
      if (req.headers.host === 'localhost:3000') {
        const { id } = await this.jwtService.verifyToken(
          token,
          TokenTypeEnum.ACCESS,
        );
        req.user = id;
      } else if (req.headers.host === 'localhost:4000') {
        const { id } = await this.jwtService.verifyAdminToken(
          token,
          TokenTypeEnum.ACCESS,
        );
        req.user = id;
      }
      return true;
    } catch (_) {
      return isPublic;
    }
  }
}
