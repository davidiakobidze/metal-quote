import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RFQ} from '../entities/rfq.entity';
import {Customer} from '../entities/customer.entity';
import {RFQController} from '../controllers/rfq.controller';
import {RFQService} from '../services/rfq.service';
import {OpenaiService} from "../services/gpt.service";
import {CustomerService} from "../services/customer.service";
import {Inventory} from "../entities/inventory.entity";
import {InventoryModule} from "./inventory.module";
import {InventoryService} from "../services/inventory.service";
import {Product} from "../entities/product.entity";
import {ProductService} from "../services/product.service";
import {QuoteModule} from "./quote.module";
import {QuoteService} from "../services/quote.service";
import {Quote} from "../entities/quote.entity";
import {QuoteProductModule} from "./quoteProduct.module";
import {QuoteProduct} from "../entities/quoteProduct.entity";
import {QuoteProductService} from "../services/quoteProduct.service";

@Module({
    imports: [
        InventoryModule,
        QuoteModule,
        QuoteProductModule,
        TypeOrmModule.forFeature([
            RFQ,
            Customer,
            Inventory,
            Product,
            Quote,
            QuoteProduct
        ]),
    ],
    controllers: [
        RFQController,
    ],
    providers: [
        RFQService,
        OpenaiService,
        CustomerService,
        InventoryService,
        ProductService,
        QuoteService,
        QuoteProductService,
    ],
})
export class RFQModule {
}