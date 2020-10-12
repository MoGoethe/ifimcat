import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from "class-validator";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

@ValidatorConstraint({ async: true })
export class ComparePasswordAndCheckUserExistConstraint
  implements ValidatorConstraintInterface {
  async validate(password: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const username = (args.object as any)[relatedPropertyName];
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) return true;
      return false;
    }

    return false;
  }
}

export function ComparePasswordAndCheckUserExist(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: ComparePasswordAndCheckUserExistConstraint
    });
  };
}