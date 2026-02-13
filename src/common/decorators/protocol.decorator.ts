import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
	(defaultValue: string, ctx: ExecutionContext) => {
		console.log('Protocol decorator called', defaultValue);
		const req = ctx.switchToHttp().getRequest();
		return req.protocol;
	},
);
