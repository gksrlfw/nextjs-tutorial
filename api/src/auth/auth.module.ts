import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy.jwt';
import { LocalStrategy } from './strategy.local';


/*
  For authenticate
  1. Need to package like passport, passport-jwt, ... DOCS have everything
  2. import module JwtModule, PassportModule and exports passportModule
  3. Write jwt.strategy.ts
  4. providers and exports jwtStrategy (why these are in auth.module??..)
  5. Add creating token logic in register and login

  Token
*/
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, LocalStrategy ]
})
export class AuthModule {}
