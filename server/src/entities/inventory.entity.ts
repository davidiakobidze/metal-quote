import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product.entity';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.inventory)
    product: Product;

    @Column({name: 'quantity_available'})
    quantityAvailable: number;

    @Column({name: 'cost_per_unit', type: 'decimal', precision: 10, scale: 2})
    costPerUnit: number;

    @Column({name: 'deliver_time'})
    deliverTime: number;
}