import { Body, Controller, Param, Put, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Public } from '../auth/decorators/public.decorator';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Put('/update-status/:OrderID')
  @UseInterceptors(NoFilesInterceptor())
  public async updateStatus(@Body() body, @Param('OrderID') OrderID: string) {
    const { OrderStatus } = body;

    return await this.ordersService.updateStatus(OrderID, OrderStatus);
  }
}
