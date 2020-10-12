import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  Generated,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export abstract class AbstractEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Generated("uuid")
  @Field(() => String)
  key: string;

  @CreateDateColumn()
  @Field()
  createAt: Date;

  @UpdateDateColumn()
  @Field()
  updateAt: Date;
}