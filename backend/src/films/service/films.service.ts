import { Inject, Injectable } from '@nestjs/common';
import { MongoFilmsRepository } from 'src/repository/mongodb/mongoRepository';
import { FilmDTO, ScheduleDto } from '../dto/films.dto';
import { PostgresRepository } from 'src/repository/postgres/postgresRepository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class FilmsService {
    constructor(@Inject('DBRepository') private readonly filmsRepository: PostgresRepository | MongoFilmsRepository) {}

    async getAllFilms(): Promise<{total: number, items: FilmDTO[]}> {
        const films = await this.filmsRepository.findAllFilms();
        return { total: films.length, items: films}
    }

    async getFilmById(id: string): Promise<{ total: number, items: ScheduleDto[] }> {
        const film = await this.filmsRepository.findFilmsById(id);
        return { total: film.schedule.length, items: film.schedule }
    }
}
