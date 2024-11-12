import { ObjectType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@shtifh/entities";

@ObjectType()
export class AuthUserEntity extends PickType(UserEntity, ['id', 'full_name', 'email', 'phone', 'language', 'role']) {
}
