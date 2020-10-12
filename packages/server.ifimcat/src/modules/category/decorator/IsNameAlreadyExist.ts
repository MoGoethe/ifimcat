import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Category } from "../entity/category.entity";

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(name: any) {
    const category = await Category.findOne({where: {name}});
    return !category
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