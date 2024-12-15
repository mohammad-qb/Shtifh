import {
  Field,
  InputType
} from '@nestjs/graphql';
import {
  Prisma
} from '@prisma/client';
import {
  IsNotEmpty,
  IsUrl
} from 'class-validator';


@InputType()
export class AdminCreateCarBrandInput
  implements Prisma.CarBrandUncheckedCreateInput
{
  @Field(() => PrismaNameJsonEntity)
  name!: PrismaJson.NameJson;

  @Field(() => String)
  @IsUrl()
  @IsNotEmpty()
  image_url!: string;

}
