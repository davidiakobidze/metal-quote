import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quote} from '../entities/quote.entity';
import {Customer} from '../entities/customer.entity';
import {QuoteController} from '../controllers/quote.controller';
import {QuoteService} from '../services/quote.service';

@Module({
    imports: [TypeOrmModule.forFeature([Quote, Customer])],
    controllers: [QuoteController],
    providers: [QuoteService],
    exports: [QuoteService],
})
export class QuoteModule {
}