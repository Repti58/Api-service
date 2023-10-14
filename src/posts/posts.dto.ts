import { Type } from "class-transformer";
import { IsInt, IsPositive, IsNotEmpty } from "class-validator";

export class PostIdDto {
    
    @IsNotEmpty()
    // @IsNumberString()
    // @IsString()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    id: number
}

