import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { AbstractEntity } from "../../../shared/abstract.entity";
import { User } from "../../user/entity/user.entity";
import { Tag } from "../../tag/entity/tag.entity";
import { Category } from "../../category/entity/category.entity";
import { Topic } from "../../topic/entity/topic.entity";
import { IsTitleAlreadyExist } from "../decorator/IsTitleAlreadyExist";

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
  @IsTitleAlreadyExist({ message: "此标题已存在" })
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column("text")
  @Field(() => String)
  body: string;

  @Column("text")
  @Field(() => String)
  draft: string;

  @Field(() => [Tag], {nullable: 'itemsAndList'})
  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags: Tag[];

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.blogs, { eager: true })
  category: Category;

  @Field(() => Topic, {nullable: true})
  @ManyToOne(() => Topic, topic => topic.blogs, { eager: true })
  topic: Topic | null;

  @Column({default: 0})
  @Field(() => Number)
  glance: number;

  @Column({default: 0})
  @Field(() => Number)
  awesome: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.blogs, { eager: true })
  author: User;

  @Column({default: true})
  @Field(() => Boolean)
  is_show: boolean;
}