import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { IsNameAlreadyExist } from "../decorator/IsNameAlreadyExist";

@InputType()
export class CreateCategoryInput {
  
  @IsNotEmpty()
  @Field()
  @IsNameAlreadyExist({message: "此名称已存在"})
  name: string;

}