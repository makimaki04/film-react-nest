import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configProvider } from 'src/app.config.provider';
import { MongoFilmsRepository } from 'src/repository/mongoRepository';
import { filmSchema } from 'src/repository/schemas/schemas';

@Module({
    imports: [
        MongooseModule.forRoot(configProvider.useValue.database.url),
        MongooseModule.forFeature([{ name: 'Films', schema: filmSchema }])
    ],
    providers: [MongoFilmsRepository],
    exports: [MongoFilmsRepository]
})
export class DatabaseModule {}
