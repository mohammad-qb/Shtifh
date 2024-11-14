import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { $Enums, Customer } from '@prisma/client';

registerEnumType($Enums.Gender, {name: 'Gender'});
@ObjectType()
export class CustomerEntity implements Customer {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  image_url!: string;

  @Field(() => $Enums.Gender)
  gender!: $Enums.Gender;

  @Field(() => Boolean)
  is_removed!: boolean;

  @Field(() => String)
  userId!: string;
}
