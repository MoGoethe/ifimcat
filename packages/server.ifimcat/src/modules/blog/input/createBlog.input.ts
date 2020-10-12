import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { IsTitleAlreadyExist } from "../decorator/IsTitleAlreadyExist";

@InputType()
export class CreateBlogInput {
  
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(48)
  @IsTitleAlreadyExist({message: "此标题已存在"})
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(256)
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @MinLength(64)
  @Field(() => String)
  body: string;

  @IsNotEmpty()
  @MinLength(64)
  @Field(() => String)
  draft: string;

  @IsNotEmpty()
  @Field(() => Number)
  category: number;

  @Field(() => Number, {nullable: true})
  topic?: number;

  @Field(() => [Number], {nullable: 'itemsAndList'})
  tags: number[];
}