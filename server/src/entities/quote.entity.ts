import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {QuoteProduct} from "./quoteProduct.entity";
import {RFQ} from "./rfq.entity";

@Entity()
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RFQ, rfq => rfq.quotes)
    @JoinColumn({ name: 'rfq_id' })
    rfq: RFQ;

    @Column({name: 'quote_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    quoteDate: Date;

    @OneToMany(() => QuoteProduct, quoteProduct => quoteProduct.quote)
    products: QuoteProduct[];
}