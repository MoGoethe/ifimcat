import { User as CurrentUserType } from "../modules/user/entity/user.entity";

declare global {
  namespace Express {
    export interface Request {
      currentUser?: CurrentUserType;
    }
  }
}