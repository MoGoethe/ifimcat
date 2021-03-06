import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class NAUpdateTopicInput {

  @Field()
  @IsNotEmpty()
  id: number;

  @Field(() => Number, { nullable: true })
  glance: number;
}