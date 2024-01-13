import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { CarEntity } from "@shtifh/entities";

class NestedCarEntity implements Pick<CarEntity, 'color' | 'id' | 'model' | 'plate' | 'type' | 'year'> {
    @ApiProperty({enum: $Enums.CarColor})
    color!: $Enums.CarColor;

    @ApiProperty()
    id!: number;

    @ApiProperty()
    model!: string;

    @ApiProperty({nullable: true})
    plate!: string | null;

    @ApiProperty({enum: $Enums.CarType})
    type!: $Enums.CarType;

    @ApiProperty()
    year!: number;
}

export class ListCarEntity {
    @ApiProperty({type: [NestedCarEntity]})
    result!: NestedCarEntity[]
}

