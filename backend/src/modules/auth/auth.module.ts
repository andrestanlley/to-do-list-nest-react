import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
