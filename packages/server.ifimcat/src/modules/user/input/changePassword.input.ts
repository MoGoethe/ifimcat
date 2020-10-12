import { InputType, Field } from "@nestjs/graphql";
import {
  MinLength,
} from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @MinLength(6)
  readonly password: string;

  @Field()
  readonly token: string;
}