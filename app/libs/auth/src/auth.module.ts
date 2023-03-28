import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './entities/refresh-token.entity';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserModule } from '@app/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { JwtRegisterStrategy } from './strategies/jwt-register.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN')),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtRegisterStrategy,
    { provide: 'REFRESH_TOKEN_SCHEMA', useValue: RefreshTokenSchema },
  ],
  exports: [
    AuthService,
    AuthRepository,
    { provide: 'REFRESH_TOKEN_SCHEMA', useValue: RefreshTokenSchema },
  ],
})
export class AuthModule {}
