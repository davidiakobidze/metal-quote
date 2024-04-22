import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RFQModule} from "./modules/rfq.module";
import {QuoteModule} from "./modules/quote.module";
import {InventoryModule} from "./modules/inventory.module";
import {CustomerModule} from "./modules/customer.module";
import {ProductModule} from "./modules/product.module";
import {Customer} from "./entities/customer.entity";
import {Product} from "./entities/product.entity";
import {Quote} from "./entities/quote.entity";
import {RFQ} from "./entities/rfq.entity";
import {Inventory} from "./entities/inventory.entity";
import {QuoteProduct} from "./entities/quoteProduct.entity";
import {QuoteProductModule} from "./modules/quoteProduct.module";
import {ProductSeeder} from "./seeder/productSeeder";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('POSTGRES_HOST'),
                port: parseInt(config.get('POSTGRES_PORT')),
                username: config.get('POSTGRES_USER'),
                password: config.get('POSTGRES_PASSWORD'),
                database: config.get('POSTGRES_DATABASE'),
                entities: [Customer, Product, Inventory, Quote, RFQ, QuoteProduct],
                synchronize: true,
            }),
        }),
        CustomerModule,
        ProductModule,
        InventoryModule,
        QuoteModule,
        RFQModule,
        QuoteProductModule,
    ],
})
export class AppModule {
}
