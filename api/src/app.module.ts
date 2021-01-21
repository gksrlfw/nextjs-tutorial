import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database-connection.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionService
  }), AuthModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
