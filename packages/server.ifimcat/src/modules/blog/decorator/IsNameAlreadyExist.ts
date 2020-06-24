import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Blog } from "../entity/blog.entity";

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(name: any) {
    const blog = await Blog.findOne({where: {name}});
    return !blog
  }
}

export function IsNameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNameAlreadyExistConstraint
    });
  };
}