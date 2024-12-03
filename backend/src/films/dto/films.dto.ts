import { IsFQDN, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { faker } from '@faker-js/faker';

export class ScheduleDto {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }

export class FilmDTO {
    @IsOptional()
    @IsString()
    readonly id: string;
    @IsNumber()
    readonly rating: number;
    @IsString()
    readonly director: string;
    readonly tags: string[];
    @IsFQDN()
    readonly image: string;
    @IsFQDN()
    readonly cover: string;
    @IsString()
    readonly title: string;
    @IsString()
    readonly about: string;
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    readonly schedule: ScheduleDto[];

    constructor(id, rating, director, tags, image, cover, title, about, description, schedule) {
        this.id = id || faker.string.uuid();
        this.rating = rating;
        this.director = director;
        this.tags = tags;
        this.image = image;
        this.cover = cover;
        this.title = title;
        this.about = about;
        this.description = description;
        this.schedule = schedule;
    }

    static fromProductEntity(productEntity) {
        return new FilmDTO(
            productEntity.id,
            productEntity.rating,
            productEntity.director,
            productEntity.tags,
            productEntity.image,
            productEntity.cover,
            productEntity.title,
            productEntity.about,
            productEntity.description,
            productEntity.schedule,
        )
    }
}