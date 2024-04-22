import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';
import {Customer} from "../../entities/customer.entity";

export class CreateQuoteDto {
    @IsInt()
    @IsNotEmpty()
    customer: Customer;

    @IsDateString()
    @IsNotEmpty()
    quoteDate: Date;
}