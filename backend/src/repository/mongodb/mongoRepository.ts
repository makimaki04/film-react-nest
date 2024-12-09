import { Model } from "mongoose";
import { Film } from "./schemas/schemas";
import { FilmDTO } from "src/films/dto/films.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongoFilmsRepository {
    constructor(@InjectModel('Films') private readonly filmsModel: Model<Film>) {}

    async findAllFilms(): Promise<FilmDTO[]> {
        try {
            const films = await this.filmsModel.find({});
            return films.map((film) => FilmDTO.fromProductEntity(film));
        } catch (error) {
            console.log(error);
        }
    }

    async findFilmsById(id: string): Promise<FilmDTO> {
        try {
            const film = await this.filmsModel.findOne({id});
            return FilmDTO.fromProductEntity(film);
        } catch (error) {
            console.log(error);
        }   
    }

    async findFilmsByIds (ids: string[]): Promise<FilmDTO[]> {
        try {
            const films = await this.filmsModel.find({ id: { $in: ids} });
            return films.map((film) => FilmDTO.fromProductEntity(film));
        } catch (error) {
            console.log(error);
        }
    }

    async updateFilms(films: FilmDTO[]) {
        for (let i = 0; i < films.length; i++) {
            for (let j = 0; j < films[i].schedule.length; j++) {
                const session = films[i].schedule[j];
                try {
                    await this.filmsModel.updateOne(
                        { id: films[i].id, 'schedule.id': session.id },
                        { $set: {"schedule.$.taken": session.taken} }
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}