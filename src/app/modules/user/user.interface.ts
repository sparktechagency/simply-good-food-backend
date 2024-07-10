import { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  name: string;
  role: USER_ROLES;
  contact: string;
  email: string;
  password: string;
  location: string;
  profile?: string;
};

export type UserModal = {
  isUserExist(id: string): IUser;
} & Model<IUser>;
