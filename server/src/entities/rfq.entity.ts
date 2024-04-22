import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Customer} from './customer.entity';
import {Quote} from "./quote.entity";

@Entity()
export class RFQ {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.rfqs)
    customer: Customer;

    @Column({name: 'rfq_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    rfqDate: Date;

    @Column({name: 'email_content', type: 'text'})
    emailContent: string;

    @OneToMany(() => Quote, quote => quote.rfq)
    quotes: Quote[];

    @Column({name: 'total_price',default: 0, type: 'decimal', precision: 10, scale: 2})
    totalPrice: number;

    @Column({name: 'total_estimation_hours', default: 0})
    totalEstimationHours: number;
}