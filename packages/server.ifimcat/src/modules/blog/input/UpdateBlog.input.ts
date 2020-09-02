import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, MinLength, MaxLength, Min } from "class-validator";

@InputType('UpdateBlogInput')
export class UpdateBlogInput {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(24)
  @Field(() => String, {nullable: true})
  title?: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @Field(() => String, {nullable: true})
  description?: string;

  @IsNotEmpty()
  @MinLength(64)
  @Field(() => String, {nullable: true})
  body?: string;

  @IsNotEmpty()
  @MinLength(64)
  @Field(() => String, { nullable: true })
  draft?: string;

  @Field(() => [Int], {nullable: true})
  tags?: number[];

  @IsNotEmpty()
  @Field(() => Int, {nullable: true})
  category?: number;

  @Field(() => Int, {nullable: true})
  topic?: number;

  @Min(0)
  @Field(() => Int, {nullable: true})
  glance?: number;

  @Min(0)
  @Field(() => Int, {nullable: true})
  awesome?: number;

  @Field(() => Boolean, {nullable: true})
  is_show?: boolean;
}