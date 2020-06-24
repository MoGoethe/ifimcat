import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { IsNameAlreadyExist } from "../decorator/IsNameAlreadyExist";

@InputType()
export class CreateBlogInput {
  
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(24)
  @IsNameAlreadyExist({message: "此标题已存在"})
  title: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  description: string;

  @IsNotEmpty()
  @MinLength(64)
  body: string;
}