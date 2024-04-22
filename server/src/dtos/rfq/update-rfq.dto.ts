import { IsOptional, IsString } from 'class-validator';

export class UpdateRFQDto {
    @IsString()
    @IsOptional()
    description?: string;

    // Add more fields to update if necessary
}