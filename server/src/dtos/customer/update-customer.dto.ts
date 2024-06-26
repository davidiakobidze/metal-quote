import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}