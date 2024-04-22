import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Quote} from '../entities/quote.entity';
import {RFQ} from "../entities/rfq.entity";

@Injectable()
export class QuoteService {
    constructor(
        @InjectRepository(Quote)
        private readonly quoteRepository: Repository<Quote>,
    ) {
    }

    async findAll(): Promise<Quote[]> {
        return this.quoteRepository.find();
    }

    async findOneById(id: number): Promise<Quote | undefined> {
        return this.quoteRepository.findOne({where: {id}});
    }

    async create(rfq: RFQ): Promise<Quote> {
        const quote = await this.quoteRepository.save({
            rfq,
            quoteDate: new Date()
        })
        return await this.quoteRepository.save(quote);
    }

    async delete(id: number): Promise<void> {
        await this.quoteRepository.delete(id);
    }
}
