import { createParamDecorator, ExecutionContext } from "@nestjs/common";


// ctx.switchToHttp()를 통해 http에 있는 request를 가져와서, @User() 를 이용하면 바로 req.user를 리턴하도록 한다
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});