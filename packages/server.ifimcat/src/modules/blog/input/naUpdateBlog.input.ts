import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType('NAUpdateBlogInput')
export class NAUpdateBlogInput {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field(() => Int, {nullable: true})
  glance: number;

  @Field(() => Int, {nullable: true})
  awesome: number;
}