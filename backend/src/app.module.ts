import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";

import {ConfigProvider} from "./app.config.provider";
import { FilmsController } from './films/controller/films.controller';
import { FilmsService } from './films/service/films.service';
import { OrderController } from './order/controller/order.controller';
import { OrderService } from './order/service/order.service';
import { DatabaseModule } from './database/database.module';
import { DBRepository } from './database/dbRepository.module';


@Module({
  imports: [
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
      }),
  ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '..', 'public')
  }),
  DatabaseModule.register(ConfigProvider.useValue),
  DBRepository.register(ConfigProvider.useValue)
  ],
  controllers: [FilmsController, OrderController],
  providers: [ConfigProvider, FilmsService, OrderService],
  exports: [ConfigProvider]
})
export class AppModule {}
