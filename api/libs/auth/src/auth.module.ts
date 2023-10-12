import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@app/user/user.module';
import { HttpModule } from '@nestjs/axios';
import {
  Session,
  SessionSchema,
  SessionSchemaFactory,
} from './entities/session.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Session.name,
        useFactory: SessionSchemaFactory,
        inject: [ConfigService],
      },
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
    // SessionAuthGuard,
    // RegisterAuthGuard,
    { provide: 'SESSION_SCHEMA', useValue: SessionSchema },
  ],
  exports: [
    AuthService,
    AuthRepository,
    // SessionAuthGuard,
    // RegisterAuthGuard,
    { provide: 'SESSION_SCHEMA', useValue: SessionSchema },
  ],
})
export class AuthModule {}
