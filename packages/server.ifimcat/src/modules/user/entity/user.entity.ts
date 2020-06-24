import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';
import { AbstractEntity } from '../../../shared/abstract.entity';
// import { UserRole } from '../../userRole/entity/userRole.entity';
import { UserRoleType } from '../../../constants/userRoles.constants';
import { Blog } from '../../blog/entity/blog.entity';
import { Topic } from '../../topic/entity/topic.entity';
import { Category } from '../../category/entity/category.entity';
import { Tag } from '../../tag/entity/tag.entity';

@ObjectType()
@Entity('users')
export class User extends AbstractEntity{
  @Column()
  @Field(() => String)
  @Index({unique: true})
  email: string;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  password: string;

  // @Field(() => [UserRole], {nullable: true})
  // @ManyToMany(() => UserRole, userRole => userRole.users)
  // @JoinTable({
  //   name: 'user_role',
  //   joinColumns: [
  //       {name: 'user_id'},
  //   ],
  //   inverseJoinColumns: [
  //       {name: 'role_id'},
  //   ],
  // })
  // roles: UserRole[] = [];

  @Field(() => [String], {nullable: 'items'})
  @Column({
    type: 'set',
    enum: UserRoleType,
    default: [UserRoleType.GHOST]
  })
  roles: UserRoleType[];

  @Field(() => Boolean)
  @Column('bool', {default: false})
  confirmed: boolean;

  @Field(() => [Blog], {nullable: 'itemsAndList'})
  @OneToMany(() => Blog, blog => blog.author)
  blogs: Blog[];

  @Field(() => [Topic], {nullable: 'itemsAndList'})
  @OneToMany(() => Topic, topic => topic.author)
  topics: Topic[];

  @Field(() => [Category], {nullable: 'itemsAndList'})
  @OneToMany(() => Category, category => category.author)
  categories: Category[];

  @Field(() => [Tag], {nullable: 'itemsAndList'})
  @OneToMany(() => Tag, tag => tag.author)
  tags: Tag[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}