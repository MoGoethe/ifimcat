import { Entity, Column, Index, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { AbstractEntity } from "../../../shared/abstract.entity";
import { User } from "../../user/entity/user.entity";
import { Blog } from "../../blog/entity/blog.entity";

@ObjectType()
@Entity('categories')
export class Category extends AbstractEntity{

  @Column()
  @Field(() => String)
  @Index({unique: true})
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.categories)
  author: User;

  @Field(() => [Blog], { nullable: 'itemsAndList' })
  @OneToMany(() => Blog, blog => blog.category)
  blogs: Blog[];

}