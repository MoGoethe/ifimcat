import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateTopicInput {

  @Field()
  @IsNotEmpty()
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  slogan: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Number, { nullable: true })
  glance: number;
}