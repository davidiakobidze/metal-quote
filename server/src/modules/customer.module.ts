import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { RFQ } from '../entities/rfq.entity';
import { Quote } from '../entities/quote.entity';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../services/customer.service';
import {CustomerSeeder} from "../seeder/customerSeeder";

@Module({
    imports: [TypeOrmModule.forFeature([Customer, RFQ, Quote])],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerSeeder],
    exports: [CustomerSeeder],
})
export class CustomerModule {}