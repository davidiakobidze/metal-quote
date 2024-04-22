import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;
}