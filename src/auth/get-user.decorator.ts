
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Agency } from 'src/database/agency.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Agency => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
