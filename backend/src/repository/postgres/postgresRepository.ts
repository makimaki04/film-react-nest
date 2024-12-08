import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilmDTO } from "src/films/dto/films.dto";
import { Film } from "src/films/entity/films.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class PostgresRepository {
    constructor(@InjectRepository(Film) private readonly filmsRepository: Repository<Film>) {}

    static entityToDTO(film: Film) {
        const scheduleArr = film.schedule.map((schedule) => {
            return {
                ...schedule,
                taken: schedule.taken ? schedule.taken.split(',') : []
            }        
        });

        const updFilm = {
            ...film,
            tags: film.tags.split(','),
            schedule: scheduleArr
        }
        
        return FilmDTO.fromProductEntity(updFilm);
    }

    static DTOtoEntity(film: FilmDTO) {
        const scheduleArr = film.schedule.map((schedule) => {
            return {
                ...schedule,
                taken: schedule.taken.join(', ')
            }
        });

        const updFilm = {
            ...film,
            tags: film.tags.join(', '),
            schedule: scheduleArr
        }

        return updFilm;
    }

    async findAllFilms(): Promise<FilmDTO[]> {
        try {
            // const films = await this.filmsRepository.find({
            //     relations: ['schedule'],
            //     order: {
            //       'schedule.daytime': 'ASC', // или 'DESC'
            //     },
            //   });

            const films = await this.filmsRepository
                                    .createQueryBuilder('film')
                                    .leftJoinAndSelect('film.schedule','schedule')
                                    .orderBy('CAST(schedule.daytime AS TIMESTAMP)', 'ASC')
                                    .getMany();

            return films.map((film) => PostgresRepository.entityToDTO(film));
        } catch (error) {
            console.log(error);
        }
    }

    async findFilmsById(id: string): Promise<FilmDTO> {
        try {
            const film = await this.filmsRepository.findOne({
                where: { id },
                relations: ['schedule']
            });
            return FilmDTO.fromProductEntity(film);
        } catch (error) {
            console.log(error);
        }   
    }

    async findFilmsByIds (ids: string[]): Promise<FilmDTO[]> {
        try {
            const films = await this.filmsRepository.find({ 
                where: {id: In(ids)},
                relations: ['schedule'] 
            })
            return films.map((film) => PostgresRepository.entityToDTO(film));
        } catch (error) {
            console.log(error);
        }
    }

    async updateFilms(films: FilmDTO[]) {
        const entities = films.map((film) => PostgresRepository.DTOtoEntity(film));

        await this.filmsRepository.save(entities)
    }
}