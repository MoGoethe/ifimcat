import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Blog } from "../entity/blog.entity";

@ValidatorConstraint({ async: true })
export class IsTitleAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(title: any) {
    const blog = await Blog.findOne({where: {title}});
    return !blog
  }
}

export function IsTitleAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsTitleAlreadyExistConstraint
    });
  };
}