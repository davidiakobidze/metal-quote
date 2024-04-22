import {IsString} from 'class-validator';

export class CreateRFQDto {
    @IsString()
    email: string;

    @IsString()
    text: string;
}
