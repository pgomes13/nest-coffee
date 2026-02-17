import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { toFileStream } from 'qrcode';
import { ActiveUser } from '../../iam/decorators/active-user.decorator';
import type { ActiveUserData } from '../../iam/interfaces/active-user-data.interface';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';
import { OtpAuthenticationService } from './otp-authentication.service';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
	constructor(
		private readonly authService: AuthenticationService,
		private readonly otpAuthService: OtpAuthenticationService,
	) {}

	@Post('sign-up')
	signUp(@Body() signUpDto: SignUpDto) {
		return this.authService.signUp(signUpDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('refresh-tokens')
	refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.refreshTokens(refreshTokenDto);
	}

	@Auth(AuthType.Bearer)
	@HttpCode(HttpStatus.OK)
	@Post('2fa/generate')
	async generateQrCode(
		@ActiveUser() activeUser: ActiveUserData,
		@Res() response: Response,
	) {
		const { secret, uri } = await this.otpAuthService.generateSecret(
			activeUser.email,
		);
		await this.otpAuthService.enableTfaForUser(activeUser.email, secret);
		response.type('png');
		return toFileStream(response, uri);
	}
}
