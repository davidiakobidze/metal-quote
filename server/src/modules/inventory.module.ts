import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Inventory} from '../entities/inventory.entity';
import {Product} from '../entities/product.entity';
import {InventoryController} from '../controllers/inventory.controller';
import {InventoryService} from '../services/inventory.service';
import {ProductService} from "../services/product.service";
import {ProductSeeder} from "../seeder/productSeeder";

@Module({
    imports: [TypeOrmModule.forFeature([Inventory, Product])],
    controllers: [InventoryController],
    providers: [InventoryService, ProductService, ProductSeeder],
    exports: [ProductSeeder]
})
export class InventoryModule {
}