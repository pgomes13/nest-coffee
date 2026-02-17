import {
	Column,
	Entity,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiKey } from 'users/api-keys/entities/api-key.entity';
import {
	Permission,
	PermissionType,
} from '../../iam/authorization/permission.type';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true, unique: true })
	googleId: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ enum: Role, default: Role.Regular })
	role: Role;

	@Column({ default: false })
	isTfaEnabled: boolean;

	@Column({ nullable: true })
	tfaSecret: string;

	@JoinTable()
	@OneToMany((type) => ApiKey, (apiKey) => apiKey.user)
	apiKeys: ApiKey[];

	@Column({ enum: Permission, default: [], type: 'json' })
	permissions: PermissionType[];
}
