import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {CreateProductDto} from '../dtos/product/create-product.dto';
import {UpdateProductDto} from '../dtos/product/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}