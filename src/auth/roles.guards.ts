import { Injectable, CanActivate,ExecutionContext,applyDecorators, SetMetadata,UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthRole } from "./auth.roles.enum";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector : Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<AuthRole[]>('roles',[context.getHandler(),context.getClass()])
        if(!requiredRoles){
            return true
        }
        const  request  = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => request.user.role?.includes(role));
    }

}

export function Roles(...roles: AuthRole[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(RolesGuard),
    );
}