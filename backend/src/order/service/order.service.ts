import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderDTO } from '../dto/order.dto';
import { MongoFilmsRepository } from 'src/repository/mongoRepository';

@Injectable()
export class OrderService {
    constructor(private readonly filmsRepository: MongoFilmsRepository) {}

    async createOrder(orderDTO: OrderDTO[]) {
        const sortedOrderByFilms: string[] = orderDTO.reduce((acc, ticket) => {
            if (acc.includes(ticket.film)) {
                return acc;
            }

            return [...acc, ticket.film];
        }, []);

        const films = await this.filmsRepository.findFilmsByIds(sortedOrderByFilms);

        const orderPesponse: OrderDTO[] = []; 
        
        for(let i = 0; i < orderDTO.length; i++) {
            const film = films.find((film) => film.id === orderDTO[i].film);
            const session = film.schedule.find((session) => session.id === orderDTO[i].session);

            const taken = `${orderDTO[i].row}:${orderDTO[i].seat}`;

            const checkTakenSeats = session.taken.find((seats) => seats === taken);

            if (checkTakenSeats) {
                throw new HttpException('Seats are already taken', HttpStatus.BAD_REQUEST);
            };

            session.taken.push(taken);
            orderPesponse.push(orderDTO[i]);
        }

        await this.filmsRepository.updateFilms(films);

        return {total: orderPesponse.length, items: orderPesponse};
    }
}
