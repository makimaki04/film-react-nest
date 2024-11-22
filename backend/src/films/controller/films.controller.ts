import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../service/films.service';
import { FilmDTO, ScheduleDto } from '../dto/films.dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmService: FilmsService){}

    @Get()
    async GetAllFilms(): Promise<{ total: number ,items: FilmDTO[] }> {
        return this.filmService.getAllFilms();
    }

    @Get(':id/schedule')
    async GetFilmById(@Param('id') id: string): Promise<{ total: number, items: ScheduleDto[] }> {
        return  this.filmService.getFilmById(id);
    }
}
