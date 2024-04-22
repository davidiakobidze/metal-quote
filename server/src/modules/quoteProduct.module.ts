import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {QuoteProduct} from "../entities/quoteProduct.entity";
import {Product} from "../entities/product.entity";
import {QuoteProductService} from "../services/quoteProduct.service";
import {QuoteProductController} from "../controllers/quoteProduct.controller";

@Module({
    imports: [TypeOrmModule.forFeature([QuoteProduct, Product, QuoteProduct])],
    controllers: [QuoteProductController],
    providers: [QuoteProductService],
})
export class QuoteProductModule {
}