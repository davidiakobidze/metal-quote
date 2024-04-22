import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Customer} from '../entities/customer.entity';
import {CreateCustomerDto} from '../dtos/customer/create-customer.dto';
import {UpdateCustomerDto} from '../dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {
    }

    async findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    async findByEmail(email: string): Promise<Customer> {
        return this.customerRepository.findOneBy({email});
    }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = this.customerRepository.create(createCustomerDto);
        return this.customerRepository.save(customer);
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        await this.customerRepository.update(id, updateCustomerDto);
        return this.customerRepository.findOne({where: {id}});
    }

    async delete(id: number): Promise<void> {
        await this.customerRepository.delete(id);
    }
}