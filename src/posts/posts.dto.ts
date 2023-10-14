import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class PostIdDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    id: number;
}
