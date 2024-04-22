import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Inventory } from '../entities/inventory.entity';
import { inventory } from './dummyData';

@Injectable()
export class ProductSeeder {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) {}

    async seed() {
        await this.seedData();
    }

    private async seedData() {
        const existingProducts = await this.productRepository.find();
        const existingInventory = await this.inventoryRepository.find();

        if (existingProducts.length === 0) {
            const productsMap = new Map<string, Product>();

            for (const item of inventory) {
                const product = new Product();
                product.name = item.product.name;
                product.description = item.product.description;
                product.unitPrice = item.product.unitPrice;
                product.deliverTime = item.product.deliverTime;

                const savedProduct = await this.productRepository.save(product);
                productsMap.set(product.name, savedProduct);
            }

            const inventoryEntities = inventory.map(item => {
                const product = productsMap.get(item.product.name);

                const inventoryItem = new Inventory();
                inventoryItem.product = product;
                inventoryItem.quantityAvailable = item.quantityAvailable;
                inventoryItem.costPerUnit = item.costPerUnit;
                inventoryItem.deliverTime = item.deliverTime;

                return inventoryItem;
            });

            await this.inventoryRepository.save(inventoryEntities);
        }
    }
}