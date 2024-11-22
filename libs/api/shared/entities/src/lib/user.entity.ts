import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Language, UserRole } from '@shtifh/helpers';


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

  @Field(() => Int)
  language!: Language;

  @Field(() => String, { nullable: true })
  reset_password_code!: string | null;

  @Field(() => Int)
  role!: UserRole;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
