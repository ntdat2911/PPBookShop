import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express-serve-static-core';
import { IContext } from 'src/config/interfaces/context.interface';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<Request>()?.user;
    }

    return GqlExecutionContext.create(context).getContext<IContext>().req?.user;
  },
);
