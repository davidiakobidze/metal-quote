import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from 'typeorm';
import { Quote } from './quote.entity';
import { Product } from './product.entity';

@Entity()
export class QuoteProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Quote, quote => quote.products)
    @JoinColumn({ name: 'quote_id' })
    quote: Quote;

    @ManyToOne(() => Product, product => product.quotes)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    quantity: number;
}