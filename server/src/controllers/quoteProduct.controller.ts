import {Controller, Get} from '@nestjs/common';
import {QuoteProductService} from "../services/quoteProduct.service";

@Controller('quote-product')
export class QuoteProductController {
    constructor(private readonly quoteProductService: QuoteProductService) {
    }

    @Get()
    async findAll() {
        return this.quoteProductService.findAll();
    }
}