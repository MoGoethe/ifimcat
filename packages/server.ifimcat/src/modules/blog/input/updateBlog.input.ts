import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType('UpdateBlogInput')
export class UpdateBlogInput {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field(() => String, {nullable: true})
  title: string;

  @Field(() => String, {nullable: true})
  description: string;

  @Field(() => String, {nullable: true})
  body: string;

  @Field(() => String, { nullable: true })
  draft: string;

  @Field(() => [Int], {nullable: true})
  tags: number[];

  @Field(() => Int, {nullable: true})
  category: number;

  @Field(() => Int, {nullable: true})
  topic: number;

  @Field(() => Int, {nullable: true})
  glance: number;

  @Field(() => Int, {nullable: true})
  awesome: number;

  @Field(() => Boolean, {nullable: true})
  is_show: boolean;
}