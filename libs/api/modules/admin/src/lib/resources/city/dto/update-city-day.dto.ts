import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class UpdateCityDayDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    start_time!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    end_time!: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    workId!: string;
}