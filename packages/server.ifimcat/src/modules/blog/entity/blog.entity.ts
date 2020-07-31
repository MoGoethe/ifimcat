import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { AbstractEntity } from "../../../shared/abstract.entity";
import { User } from "../../user/entity/user.entity";
import { Tag } from "../../tag/entity/tag.entity";
import { Category } from "../../category/entity/category.entity";
import { Topic } from "../../topic/entity/topic.entity";

/**
 * 博客主体
 * title 标题
 * description 描述
 * body 内容
 * tag 标签
 * category 类别
 * topic 专题
 * glance 浏览次数
 * awesome 点赞次数
 */

@ObjectType()
@Entity('blogs')
export class Blog extends AbstractEntity{
  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column("text")
  @Field(() => String)
  body: string;

  @Field(() => [Tag], {nullable: 'itemsAndList'})
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.blogs)
  category: Category;

  @Field(() => Topic, {nullable: true})
  @ManyToOne(() => Topic, topic => topic.blogs)
  topic: Topic | null;

  @Column({default: 0})
  @Field(() => Number)
  glance: number;

  @Column({default: 0})
  @Field(() => Number)
  awesome: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.blogs)
  author: User;

  @Column({default: true})
  @Field(() => Boolean)
  is_show: boolean;
}