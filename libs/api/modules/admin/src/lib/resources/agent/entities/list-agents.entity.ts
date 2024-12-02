import { Field, ObjectType } from '@nestjs/graphql';
import { AgentEntity, UserEntity } from '@shtifh/entities';

@ObjectType()
export class AdminListAgentsUserEntity extends UserEntity {}

@ObjectType()
export class AdminListAgentsEntity extends AgentEntity {
  @Field(() => AdminListAgentsUserEntity)
  user!: AdminListAgentsUserEntity;
}
