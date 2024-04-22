import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RFQ} from '../entities/rfq.entity';
import {CreateRFQDto} from "../dtos/rfq/reate-rfq.dto";
import {OpenaiService} from "./gpt.service";
import {CustomerService} from "./customer.service";
import {Customer} from "../entities/customer.entity";
import {InventoryService} from "./inventory.service";
import {Inventory} from "../entities/inventory.entity";
import {QuoteService} from "./quote.service";
import {Quote} from "../entities/quote.entity";
import {QuoteProductService} from "./quoteProduct.service";
import {Product} from "../entities/product.entity";

@Injectable()
export class RFQService {
    constructor(
        @InjectRepository(RFQ)
        private readonly rfqRepository: Repository<RFQ>,
        private readonly openaiService: OpenaiService,
        private readonly customerService: CustomerService,
        private readonly inventoryService: InventoryService,
        private readonly quoteService: QuoteService,
        private readonly quoteProductService: QuoteProductService,
        @InjectRepository(Quote)
        private readonly quoteRepository: Repository<Quote>
    ) {
    }

    async findAll(): Promise<any[]> {
        const quotes = await this.quoteRepository
            .createQueryBuilder('quote')
            .leftJoinAndSelect('quote.rfq', 'rfq')
            .leftJoinAndSelect('rfq.customer', 'customer')
            .leftJoinAndSelect('quote.products', 'products')
            .leftJoinAndSelect('products.product', 'product')
            .leftJoinAndSelect('product.inventory', 'inventory')
            .getMany();
        return quotes.map(quote => {

            return {
                quote,
                products: quote.products,
            }
        })
    }

    async create(createRFQDto: CreateRFQDto) {
        const {text, email} = createRFQDto;
        const customer: Customer = await this.customerService.findByEmail(email);

        if (!customer) {
            throw new HttpException(`Customer does not exist with email: ${email}`, 404);
        }

        // Create RFQ
        const rfq: RFQ = this.rfqRepository.create({
            customer,
            rfqDate: new Date(),
            emailContent: text
        });

        const savedRFQ: RFQ = await this.rfqRepository.save(rfq);
        // Create RFQ

        const quotesGPTData: QuoteGPT[] = await this.openaiService.extractInformation(text);
        const products = [];

        const quote: Quote = await this.quoteService.create(savedRFQ);
        let totalPrice: number = 0
        let totalEstimationHours: number = 0

        // Create quotes and quote products in parallel
        await Promise.all(quotesGPTData.map(async quoteGPT => {
            try {
                const {productName, quantity} = quoteGPT;
                const inventory: Inventory = await this.inventoryService.findOneByProductName(productName);
                if (inventory) {
                    const {quantityAvailable, costPerUnit, product, deliverTime: inventoryDeliverTime} = inventory
                    let {price, estimationHour} = this.getPriceAndEstimation(
                        quantity,
                        product,
                        costPerUnit,
                        quantityAvailable,
                        inventoryDeliverTime
                    )

                    totalPrice += price
                    // Lead time estimates time is maximum time delivery from one of products
                    totalEstimationHours = Math.max(totalEstimationHours, estimationHour)

                    await this.quoteProductService.create(quote, product, quantity);

                    products.push({
                        product: {
                            ...inventory.product,
                        },
                        quantity
                    });
                }
            } catch (error) {
                console.error(`Error creating quote: ${error.message}`);
            }
        }));

        rfq.totalPrice =Math.round(totalPrice * 100) / 100
        rfq.totalEstimationHours = totalEstimationHours
        await this.rfqRepository.save(rfq);

        return {
            quote,
            products
        };
    }

    async update(id: number, updates: Partial<RFQ>): Promise<RFQ | undefined> {
        await this.rfqRepository.update(id, updates);
        return this.rfqRepository.findOne({where: {id}});
    }

    async delete(id: number): Promise<void> {
        await this.rfqRepository.delete(id);
    }

    getPriceAndEstimation(
        quantity: number,
        product: Product,
        costPerUnit: number,
        quantityAvailable: number,
        inventoryDeliverTime: number
    ): { estimationHour: number; price: number } {
        let price: number
        let estimationHour: number
        if (quantity > quantityAvailable) {
            const additionalQuantity: number = quantity - quantityAvailable
            price = additionalQuantity * costPerUnit + quantityAvailable * product.unitPrice
            estimationHour = Math.max(
                additionalQuantity * inventoryDeliverTime, quantityAvailable * product.deliverTime
            )
        } else {
            price = quantity * product.unitPrice
            estimationHour = quantity * product.deliverTime
        }
        return {
            price,
            estimationHour
        }
    }
}
