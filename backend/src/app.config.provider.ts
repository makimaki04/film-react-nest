import {ConfigModule} from "@nestjs/config";

export const ConfigProvider = {
    imports: [ConfigModule.forRoot()],
    provide: 'CONFIG',
    useValue: < AppConfig> {
        database: {
            driver: process.env.DATABASE_DRIVER,
            url: process.env.DATABASE_URL,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            dbname: process.env.DATABASE_NAME,
        },
        logger: process.env.logger,
    },
}

export interface AppConfig {
    database: AppConfigDatabase
    logger: LoggerConfig
}

export enum LoggerConfig{
    dev = 'dev',
    json = 'json',
    tskv = 'tskv',
  }

export interface AppConfigDatabase {
    driver: string
    url: string
    port: number
    username: string
    password: string
    dbname: string
}
