import { InputType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  MinLength,
} from 'class-validator';
import { IsEmailAlreadyExist } from "../decorator/IsEmailAlreadyExist";

@InputType()
export class UpdateUserInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({message: "Email is already in use!"})
  readonly email?: string;

  @Field()
  @MinLength(4)
  readonly username?: string;

  @Field()
  readonly roleId?: number;
}