import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import OrdersProducts from './OrdersProducts';
  import Customer from '@modules/customers/typeorm/entities/Customer';
  
  @Entity('orders')
  class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
      cascade: true,
    })
    order_products: OrdersProducts[];
  }
  
  export default Order;