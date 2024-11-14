import { Field, registerEnumType, ObjectType } from '@nestjs/graphql';
import { $Enums, Service } from '@prisma/client';
import { PrismaNameJsonEntity } from './common/prisma-name-json.entity';

registerEnumType($Enums.ServiceType, { name: 'ServiceType' });

@ObjectType()
export class ServiceEntity implements Service {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameJsonEntity)
  name!: PrismaNameJsonEntity;

  @Field(() => String)
  type!: $Enums.ServiceType;

  @Field(() => String, { nullable: true })
  image_url!: string | null;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
