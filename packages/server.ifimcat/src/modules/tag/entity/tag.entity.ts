import { Entity, Column, Index, ManyToOne } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { AbstractEntity } from "../../../shared/abstract.entity";
import { User } from "../../user/entity/user.entity";

@ObjectType()
@Entity('tags')
export class Tag extends AbstractEntity{

  @Column()
  @Field(() => String)
  @Index({unique: true})
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.tags, {eager: true})
  author: User;

}