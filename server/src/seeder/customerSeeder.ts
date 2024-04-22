import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { customers } from './dummyData';

@Injectable()
export class CustomerSeeder {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async seed() {
        const existingCustomers = await this.customerRepository.find();
        if (existingCustomers.length === 0) {
            await this.customerRepository.save(customers);
        }
    }
}