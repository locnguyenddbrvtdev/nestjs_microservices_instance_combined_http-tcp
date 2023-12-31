import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGaurd } from '@common/guard/global.guard';
import { JwtModule } from '@nestjs/jwt';

const envFilePath = `.env.${process.env.NODE_ENV ?? 'development'}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envFilePath, '.env'],
      cache: true,
      expandVariables: true,
      validationOptions: {
        abortEarly: false,
      },
    }),
    JwtModule.register({ global: true }),
  ],
  providers: [
    AppConfigService,
    { provide: APP_GUARD, useClass: GlobalAuthGaurd },
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
