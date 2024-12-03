import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderDTO, OrderReqDTO } from '../dto/order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    createOrder(@Body() orderReqDTO: OrderReqDTO) {
        return this.orderService.createOrder(orderReqDTO.tickets);
    }
}
