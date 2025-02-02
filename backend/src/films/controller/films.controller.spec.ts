import { Test } from '@nestjs/testing';

import { FilmsController } from './films.controller';
import { FilmsService } from '../service/films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest.fn(),
        getFilmById: jest.fn(),
      })
      .compile();
    filmsController = moduleRef.get<FilmsController>(FilmsController);
    filmsService = moduleRef.get<FilmsService>(FilmsService);
  });

  it('.findAll() should call GetAllFilms method', () => {
    filmsController.GetAllFilms();
    expect(filmsService.getAllFilms).toHaveBeenCalled();
  });

  it('.findSchedule() should call GetFilmById method', () => {
    const item = 'ID';
    filmsController.GetFilmById(item);
    expect(filmsService.getFilmById).toHaveBeenCalledWith(item);
  });
});