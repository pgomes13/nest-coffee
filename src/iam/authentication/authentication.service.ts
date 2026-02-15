import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
	) {}

	async signUp(signUpDto: SignUpDto) {
		const user = new User();
		user.email = signUpDto.email;
		user.password = signUpDto.password;
	}
}
