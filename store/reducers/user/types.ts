import { IUser } from "../../../models/IUser";

export interface IUserState {
  user: IUser | null;
  isAuth: boolean;
}
