import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, MinLength, MaxLength, Min } from "class-validator";

@InputType('UpdateBlogInput')
export class UpdateBlogInput {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @MinLength(2)
  @MaxLength(48)
  @Field(() => String, {nullable: true})
  title: string;

  @MinLength(8)
  @MaxLength(256)
  @Field(() => String, {nullable: true})
  description: string;

  @MinLength(64)
  @Field(() => String, {nullable: true})
  body: string;

  @MinLength(64)
  @Field(() => String, { nullable: true })
  draft: string;

  @Field(() => [Int], {nullable: true})
  tags: number[];

  @Field(() => Int, {nullable: true})
  category: number;

  @Field(() => Int, {nullable: true})
  topic: number;

  @Min(0)
  @Field(() => Int, {nullable: true})
  glance: number;

  @Min(0)
  @Field(() => Int, {nullable: true})
  awesome: number;

  @Field(() => Boolean, {nullable: true})
  is_show: boolean;
}