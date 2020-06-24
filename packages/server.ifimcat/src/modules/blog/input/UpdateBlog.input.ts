import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, MinLength, MaxLength, Min } from "class-validator";
import { IsNameAlreadyExist } from "../../topic/decorator/IsNameAlreadyExist";

@InputType('UpdateBlogInput')
export class UpdateBlogInput {

  @IsNotEmpty()
  @Field()
  id: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(24)
  @IsNameAlreadyExist({message: "此标题已存在"})
  @Field()
  title: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @Field()
  description: string;

  @IsNotEmpty()
  @MinLength(64)
  @Field()
  body: string;

  @Field(() => [Number])
  tags?: number[];

  @IsNotEmpty()
  @Field(() => Number)
  category?: number;

  @Field(() => Number)
  topic?: number;

  @Min(0)
  @Field(() => Int)
  glance: number;

  @Min(0)
  @Field(() => Int)
  awesome: number;

  @Field(() => Boolean)
  is_show: boolean;
}