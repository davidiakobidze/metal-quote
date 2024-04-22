import {IsInt, IsNotEmpty, IsNumber, IsPositive} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
    @IsInt()
    productId: number;

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    quantityAvailable: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    costPerUnit: number;

    @IsNotEmpty()
    @IsNumber()
    deliverTime: number;
}