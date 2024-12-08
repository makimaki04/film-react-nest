import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from 'src/app.config.provider';
import { Film, Schedule } from 'src/films/entity/films.entity';

@Module({})
export class DatabaseModule {
    static register(config: AppConfig): DynamicModule {
        const imports = [];

        const dbDriver = config.database.driver;

        if (dbDriver === 'mongodb') {
            imports.push(
                MongooseModule.forRootAsync({
                    useFactory: () => ({
                        uri: config.database.url
                    })
                })
            )
        } else if (dbDriver === 'postgres') {
            imports.push(
                TypeOrmModule.forRootAsync({
                    useFactory: () => ({
                        type: dbDriver,
                        host: config.database.url,
                        port: config.database.port,
                        username: config.database.username,
                        password: config.database.password,
                        database: config.database.dbname,
                        entities: [Film, Schedule],
                        synchronize: true,
                        logging: true,
                    })
                })
            )
        }
        return {
            module: DatabaseModule,
            imports
        }
    }
}