import {
  Entity,
  Column,
  Index,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from "@nestjs/graphql";
import { AbstractEntity } from "../../../shared/abstract.entity";
import { User } from "../../user/entity/user.entity";
import { Blog } from '../../blog/entity/blog.entity';

@ObjectType()
@Entity('tags')
export class Tag extends AbstractEntity {
  @Column()
  @Field(() => String)
  @Index({ unique: true })
  name: string;

  @Column()
  @Field(() => String)
  slogan: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: 0 })
  @Field(() => Number)
  glance: number;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.tags,
  )
  author: User;

  @Field(() => [Blog], { nullable: 'itemsAndList' })
  @ManyToMany(() => Blog, { onDelete: "CASCADE"})
  @JoinTable()
  blogs: Blog[];
}