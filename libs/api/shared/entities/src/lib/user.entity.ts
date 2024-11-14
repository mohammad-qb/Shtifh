import { Field, registerEnumType, ObjectType } from '@nestjs/graphql';
import { $Enums, User } from '@prisma/client';

registerEnumType($Enums.Lang, { name: 'Lang' });
registerEnumType($Enums.UserRole, { name: 'UserRole' });

@ObjectType()
export class UserEntity implements User {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  full_name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  phone!: string;

  @Field(() => String)
  password!: string;

  @Field(() => Boolean)
  is_blocked!: boolean;

  @Field(() => $Enums.Lang)
  language!: $Enums.Lang;

  @Field(() => String, { nullable: true })
  reset_password_code!: string | null;

  @Field(() => $Enums.UserRole)
  role!: $Enums.UserRole;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
