import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword, isPasswordMatched } from 'utils/hash-password';
import { Role } from '@/common/role/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await hashPassword(createUserDto.password);
    user.role = createUserDto.role;

    return this.userRepository.save(user);
  }

  async findAllUser(currentUser: User): Promise<User[]> {
    if (currentUser.role === Role.USER) {
      const user = await this.findByEmail(currentUser.email);
      if (user) return [user];
      return [];
    }
    return this.userRepository.find();
  }

  async findByUserId(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Validate current password if provided and user has existing password
    if (
      updateUserDto.password &&
      !isPasswordMatched(updateUserDto.password, user.password)
    ) {
      throw new BadRequestException('Invalid Password');
    }

    // Update password if new password is provided
    if (updateUserDto.newPassword) {
      if (isPasswordMatched(updateUserDto.newPassword, user.password)) {
        throw new BadRequestException(
          'New password cannot be the same as the old password',
        );
      }
      user.password = await hashPassword(updateUserDto.newPassword);
    }

    user.username = updateUserDto.username || user.username;

    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id);
  }
}
