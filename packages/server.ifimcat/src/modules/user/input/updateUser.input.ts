import { InputType, Field, registerEnumType, Int } from "@nestjs/graphql";
import { UserRoleType } from "../../../constants/userRoles.constants";

registerEnumType(UserRoleType, { name: "UserRoleType"})

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  readonly userId: number;
    
  @Field(() => Boolean, {nullable: true})
  readonly forbid?: boolean;

  @Field(() => String, { nullable: true })
  readonly username?: string;

  @Field(() => [UserRoleType], {nullable: true})
  readonly roles?: UserRoleType[];
}