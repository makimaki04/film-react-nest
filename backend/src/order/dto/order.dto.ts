import { Type } from "class-transformer";
import { faker } from '@faker-js/faker';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDTO {
    @IsString()
    @IsNotEmpty()
    readonly film: string;
    @IsString()
    @IsNotEmpty()
    readonly session: string;
    @IsString()
    @IsNotEmpty()
    readonly daytime: string;
    @IsNumber()
    @IsNotEmpty()
    readonly row: number;
    @IsNumber()
    @IsNotEmpty()
    readonly seat: number;
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    @IsString()
    @IsNotEmpty()
    readonly id: string;


    constructor (id, film, session, daytime, row, seat, price) {
        this.film = film;
        this.session = session;
        this.daytime = daytime;
        this.row = row;
        this.seat = seat;
        this.price = price;
        this.id = id;
    }

    static fromProductEntity(productEntity) {
        return new OrderDTO(
            productEntity.film,
            productEntity.session,
            productEntity.daytime,
            productEntity.row,
            productEntity.seat,
            productEntity.price,
            faker.string.uuid()
        )
    }
}

export class OrderReqDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly phone: string;
    @Type(() => OrderDTO)
    @IsNotEmpty()
    readonly tickets: OrderDTO[];
}