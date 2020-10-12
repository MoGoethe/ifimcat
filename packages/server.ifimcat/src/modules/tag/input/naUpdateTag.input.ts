import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class NAUpdateTagInput {

  @Field()
  @IsNotEmpty()
  id: number;

  @Field(() => Number, { nullable: true })
  glance: number;

}