import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from '../entities/product.entity';
import {Inventory} from '../entities/inventory.entity';
import {ProductController} from '../controllers/product.controller';
import {ProductService} from '../services/product.service';
import {ProductSeeder} from "../seeder/productSeeder";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Inventory])],
    controllers: [ProductController],
    providers: [ProductService, ProductSeeder],
    exports: [ProductSeeder]
})
export class ProductModule {
}