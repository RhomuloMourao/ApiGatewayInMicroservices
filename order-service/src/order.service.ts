import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { logger } from './logger';

@Injectable()
export class OrderService {
  private orders = [];
  private readonly logger = new Logger(OrderService.name);

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = { ...createOrderDto, id: Date.now().toString() };
    this.orders.push(order);
    logger.info(`(order-service): Order created with ID: ${order.id}`, {
      context: OrderService.name,
    });
    return order;
  }

  async getOrder(id: string) {
    const order = this.orders.find((order) => order.id === id);
    logger.info(`(order-service): Order fetched with ID: ${id}`, {
      context: OrderService.name,
    });
    return order;
  }

  async getAllOrders() {
    logger.info('(order-service): Fetching all orders', {
      context: OrderService.name,
    });
    return this.orders;
  }

  async deleteOrder(id: string) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index !== -1) {
      this.orders.splice(index, 1);
      logger.info(`(order-service): Order deleted with ID: ${id}`, {
        context: OrderService.name,
      });
      return { message: '(order-service): Order deleted successfully' };
    }
    logger.error(`(order-service): Order not found with ID: ${id}`, {
      context: OrderService.name,
    });
    throw new Error('(order-service): Order not found');
  }
}
