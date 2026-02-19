import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import createRedisStore from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import passport from 'passport';
import { ApiKey } from 'users/api-keys/entities/api-key.entity';
import { User } from '../users/entities/user.entity';
import { ApiKeysService } from './authentication/api-keys.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { ApiKeyGuard } from './authentication/guards/api-key.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { OtpAuthenticationService } from './authentication/otp-authentication.service';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import { UserSerializer } from './authentication/serializers/user-serializer';
import { SessionAuthenticationController } from './authentication/session-authentication.controller';
import { SessionAuthenticationService } from './authentication/session-authentication.service';
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller';
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service';
import { PermissionsGuard } from './authorization/guards/permissions.guard';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, ApiKey]),
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
	],
	controllers: [
		AuthenticationController,
		GoogleAuthenticationController,
		SessionAuthenticationController,
	],
	providers: [
		{
			provide: HashingService,
			useClass: BcryptService,
		},
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PermissionsGuard,
		},
		// {
		// 	provide: APP_GUARD,
		// 	useClass: PoliciesGuard,
		// },
		AuthenticationService,
		ApiKeyGuard,
		AccessTokenGuard,
		RefreshTokenIdsStorage,
		ApiKeysService,
		GoogleAuthenticationService,
		OtpAuthenticationService,
		SessionAuthenticationService,
		UserSerializer,
	],
	exports: [AuthenticationService],
})
export class IamModule implements NestModule {
	async configure(consumer: MiddlewareConsumer) {
		const RedisStore = createRedisStore(session);

		consumer
			.apply(
				session({
					store: new RedisStore({ client: new Redis(6379, 'localhost') }),
					secret: process.env.SESSION_SECRET ?? '',
					resave: false,
					saveUninitialized: false,
					cookie: {
						sameSite: true,
						httpOnly: true,
					},
				}),
				passport.initialize(),
				passport.session(),
			)
			.forRoutes('*');
	}
}
