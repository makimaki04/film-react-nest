import { DynamicModule, Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfig } from "src/app.config.provider";
import { Film, Schedule } from "src/films/entity/films.entity";
import { MongoFilmsRepository } from "src/repository/mongodb/mongoRepository";
import { filmSchema } from "src/repository/mongodb/schemas/schemas";
import { PostgresRepository } from "src/repository/postgres/postgresRepository";

@Module({})
export class DBRepository {
    static register(config: AppConfig): DynamicModule {
        const imports = [];
        const dbDriver = config.database.driver; 

        const provider: Provider = {
            provide: 'DBRepository',
            useClass: dbDriver === 'postgres' ? PostgresRepository : MongoFilmsRepository
        }

        if (dbDriver === 'mongodb') {
            imports.push(
                MongooseModule.forFeature([{name: 'Films', schema: filmSchema}])
            );
        } else if (dbDriver === 'postgres') {
            imports.push(
                TypeOrmModule.forFeature([Film, Schedule])
            )
        }

        return {
            module: DBRepository,
            imports,
            providers: [provider],
            exports: [provider]
        }
    }
}