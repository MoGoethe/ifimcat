import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Topic } from "../entity/topic.entity";

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(name: any) {
    const topic = await Topic.findOne({where: {name}});
    return !topic
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