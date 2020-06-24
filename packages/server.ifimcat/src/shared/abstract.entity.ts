import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { v4 } from 'uuid';

@Entity()
@ObjectType()
export abstract class AbstractEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('varchar', {default: v4()})
  @Field(() => String)
  key: string;

  @CreateDateColumn()
  @Field()
  createAt: Date;

  @UpdateDateColumn()
  @Field()
  updateAt: Date;
}