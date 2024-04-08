import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUnavailableSlot {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    start_time!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    end_time!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cityId!: string;
}