import {IsInt, IsNumber, IsPositive, IsOptional, IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInventoryDto {
    @IsInt()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    quantityAvailable?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    costPerUnit?: number;

    @IsNumber()
    deliverTime: number;
}