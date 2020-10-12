import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../modules/user/entity/user.entity';
import { UserRoleType } from '../constants/userRoles.constants';

@Injectable()
export class GQLAuthGuard implements CanActivate {
  constructor(private role: UserRoleType = UserRoleType.GHOST) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { session } = ctx.getContext().req;
    if (!session || !session.userId) {
      throw new UnauthorizedException('用户未登录');
    }
    const user = await User.findOne({id: session.userId});
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.roles.indexOf(this.role) === -1) {
      throw new UnauthorizedException('权限不足');
    }
    ctx.getContext().req.currentUser = user;
    return true;
  }
}