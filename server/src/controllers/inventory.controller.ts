import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {InventoryService} from '../services/inventory.service';
import {CreateInventoryDto} from '../dtos/inventory/create-inventory.dto';
import {UpdateInventoryDto} from '../dtos/inventory/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {
    }

    @Get()
    async findAll() {
        return this.inventoryService.findAll();
    }

    @Post()
    async create(@Body() createInventoryDto: CreateInventoryDto) {
        return this.inventoryService.create(createInventoryDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto) {
        return this.inventoryService.update(id, updateInventoryDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.inventoryService.delete(id);
    }
}