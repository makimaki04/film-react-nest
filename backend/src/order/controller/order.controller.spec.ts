import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { OrderReqDTO } from '../dto/order.dto';


describe('OrdersController', () => {
  let orderController: OrderController
  let orderService: OrderService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn(),
      })
      .compile();
      orderController = moduleRef.get<OrderController>(OrderController);
      orderService = moduleRef.get<OrderService>(OrderService);
  });

  it('.create() should call create method', () => {
    const item = new OrderReqDTO();

    orderController.createOrder(item);

    expect(orderService.createOrder).toHaveBeenCalledWith(item.tickets);
  });
});