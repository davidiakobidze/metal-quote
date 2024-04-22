import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {QuoteProduct} from '../entities/quoteProduct.entity';
import {Quote} from "../entities/quote.entity";
import {Product} from "../entities/product.entity";

@Injectable()
export class QuoteProductService {
    constructor(
        @InjectRepository(QuoteProduct)
        private readonly quoteProductRepository: Repository<QuoteProduct>,
    ) {
    }

    async findAll(): Promise<QuoteProduct[]> {
        return await this.quoteProductRepository
            .createQueryBuilder('quoteProduct')
            .leftJoinAndSelect('quoteProduct.product', 'product')
            .leftJoinAndSelect('quoteProduct.quote', 'quote')
            .leftJoinAndSelect('quote.rfq', 'rfq')
            .getMany();
    }

    async findOneById(id: number): Promise<QuoteProduct | undefined> {
        return this.quoteProductRepository.findOne({where: {id}});
    }

    async create(quote: Quote, product: Product, quantity: number): Promise<QuoteProduct> {
        const quoteProduct: QuoteProduct = this.quoteProductRepository.create({
            quote,
            product,
            quantity
        });
        return this.quoteProductRepository.save(quoteProduct)
    }

    async delete(id: number): Promise<void> {
        await this.quoteProductRepository.delete(id);
    }
}
