import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ILike, Repository} from 'typeorm';
import {Inventory} from '../entities/inventory.entity';
import {CreateInventoryDto} from "../dtos/inventory/create-inventory.dto";
import {ProductService} from "./product.service";
import {Product} from "../entities/product.entity";

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
        private readonly productService: ProductService,
    ) {
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find()
    }

    async findOneById(id: number): Promise<Inventory | undefined> {
        return this.inventoryRepository.findOne({where: {id}});
    }

    async findOneByProductName(name: string): Promise<Inventory | undefined> {
        const refactoredName: string = name.toLowerCase().replace(" ", "%")
        return await this.inventoryRepository.findOne({
            where: {
                product: {
                    name: ILike(refactoredName)
                }
            },
            relations: ['product']
        });
    }

    async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
        const {productId} = createInventoryDto;

        const product: Product = await this.productService.findOneById(productId);
        if (!product) {
            throw new HttpException(`Product with ID ${productId} not found`, 404);
        }
        const inventory: Inventory = this.inventoryRepository.create({
            product,
            ...createInventoryDto
        })

        return this.inventoryRepository.save(inventory);
    }

    async update(id: number, updates: Partial<Inventory>): Promise<Inventory | undefined> {
        await this.inventoryRepository.update(id, updates);
        return this.inventoryRepository.findOne({where: {id}});
    }

    async delete(id: number): Promise<void> {
        await this.inventoryRepository.delete(id);
    }
}