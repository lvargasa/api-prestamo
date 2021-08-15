import { TypeOrmModuleOptions } from '@nestjs/typeorm'

class ConfigService {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/**/*.ts'],
      cli: {
        migrationsDir: 'src/migration'
      },
      synchronize: true
    }
  }
}

export const configService = new ConfigService()
