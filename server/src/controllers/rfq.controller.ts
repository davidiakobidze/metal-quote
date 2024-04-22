import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RFQService } from '../services/rfq.service';
import {CreateCustomerDto} from "../dtos/customer/create-customer.dto";
import {CreateRFQDto} from "../dtos/rfq/reate-rfq.dto";

@Controller('rfqs')
export class RFQController {
    constructor(
        private readonly rfqService: RFQService,
        private readonly qu: RFQService,
    ) {}

    @Post()
    async get(@Body() createRFQDto: CreateRFQDto) {
        return this.rfqService.create(createRFQDto);
    }

   @Get()
    async findAll() {
        return this.rfqService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.rfqService.delete(id);
    }
}