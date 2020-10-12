import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Tag } from "../entity/tag.entity";

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(name: any) {
    const tag = await Tag.findOne({where: {name}});
    return !tag
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