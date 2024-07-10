import { StatusCodes } from 'http-status-codes';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createTeacherToDB = async (payload: Partial<IUser>): Promise<IUser> => {
  //set role
  payload.role = USER_ROLES.TEACHER;
  const createTeacher = await User.create(payload);
  if (!createTeacher) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create teacher');
  }

  return createTeacher;
};

export const UserService = { createTeacherToDB };
