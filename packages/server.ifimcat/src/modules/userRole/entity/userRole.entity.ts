// import {
//   Entity,
//   Column,
//   ManyToMany,
// } from 'typeorm';
// import { AbstractEntity } from '../../../shared/abstract.entity';
// import { Field, ObjectType } from '@nestjs/graphql';
// import { User } from '../../user/entity/user.entity';
// import { UserRoleType } from '../../../constants/userRoles.constants';

// @ObjectType()
// @Entity('userroles')
// export class UserRole extends AbstractEntity{

//   @Field()
//   @Column()
//   name: string;

//   @ManyToMany(() => User, user => user.roles, { cascade: true })
//   users: User[];
// }