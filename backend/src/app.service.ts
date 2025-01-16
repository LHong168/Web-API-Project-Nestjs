import { Injectable, OnModuleInit } from '@nestjs/common';

import { UsersService } from './api/users/users.service';
import { Role } from './common/role/role.enum';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    const adminEmail = process.env.ADMIN_EMAIL || '';
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    const existingAdmin = await this.userService.findByEmail(adminEmail);

    if (!existingAdmin) {
      await this.userService.createUser({
        email: adminEmail,
        password: adminPassword,
        username: 'Admin',
        role: Role.ADMIN
      });
    }
  }
}
