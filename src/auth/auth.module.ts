/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PersonasModule } from 'src/personas/personas.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PersonasModule,
    JwtModule.register({
      global: true,
      secret: `client_id:clientId,client_secret:clientSecret,scope:api/personas,grant_type:client_credentials`,
      signOptions: { expiresIn: '3600s' },
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
