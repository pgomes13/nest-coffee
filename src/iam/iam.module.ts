import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [AuthenticationController],
	providers: [
		AuthenticationService,
		{
			provide: HashingService,
			useClass: BcryptService,
		},
	],
	exports: [AuthenticationService],
})
export class IamModule {}
