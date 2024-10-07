import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  private orders = [];

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = { ...createOrderDto, id: Date.now().toString() };
    this.orders.push(order);
    return order;
  }

  async getOrder(id: string) {
    return this.orders.find((order) => order.id === id);
  }

  async getAllOrders() {
    return this.orders;
  }

  async deleteOrder(id: string) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index !== -1) {
      this.orders.splice(index, 1);
      return { message: 'Order deleted successfully' };
    }
    throw new Error('Order not found');
  }
}
