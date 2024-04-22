import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RFQ} from './rfq.entity';
import {Quote} from "./quote.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column({unique: true})
    email: string;

    @OneToMany(() => RFQ, rfq => rfq.customer)
    rfqs: RFQ[];
}