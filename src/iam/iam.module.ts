import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from 'users/api-keys/entities/api-key.entity';
import { User } from '../users/entities/user.entity';
import { ApiKeysService } from './authentication/api-keys.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { ApiKeyGuard } from './authentication/guards/api-key.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
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
	controllers: [AuthenticationController],
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
	],
	exports: [AuthenticationService],
})
export class IamModule {}
