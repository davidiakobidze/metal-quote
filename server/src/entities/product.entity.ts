import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Inventory} from './inventory.entity';
import {QuoteProduct} from "./quoteProduct.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({name: 'unit_price', type: 'decimal', precision: 10, scale: 2})
    unitPrice: number;

    @OneToMany(() => Inventory, inventory => inventory.product)
    inventory: Inventory[];

    @OneToMany(() => QuoteProduct, quoteProduct => quoteProduct.product)
    quotes: QuoteProduct[];

    @Column({name: 'deliver_time'})
    deliverTime: number;
}