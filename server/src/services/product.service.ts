import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from '../entities/product.entity';
import {CreateProductDto} from "../dtos/product/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product: Product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    async findOneById(id: number): Promise<Product | undefined> {
        return this.productRepository.findOne({where: {id}});
    }

    async update(id: number, updates: Partial<Product>): Promise<Product | undefined> {
        await this.productRepository.update(id, updates);
        return this.productRepository.findOne({where: {id}});
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}