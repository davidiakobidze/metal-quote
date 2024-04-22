import {Controller, Delete, Get, Param} from '@nestjs/common';
import {QuoteService} from '../services/quote.service';

@Controller('quotes')
export class QuoteController {
    constructor(private readonly quoteService: QuoteService) {
    }

    @Get()
    async findAll() {
        return this.quoteService.findAll();
    }


    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.quoteService.delete(id);
    }
}