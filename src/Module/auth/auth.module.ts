import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './Jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './auth.constants';
import { Users } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret|| 'default_secret_key', 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  // exports: [JwtModule,PassportModule],
})
export class AuthModule {}
