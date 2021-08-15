import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { configService } from './config/config.service'
import { AuthModule } from './auth/auth.module'
import { CryptoModule } from './crypto/crypto.module'
import { LoansModule } from './loans/loans.module';
import { ClientsModule } from './clients/clients.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    CryptoModule,
    LoansModule,
    ClientsModule,
    PaymentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
