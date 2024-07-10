import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IVerifyEmail } from '../../../types/auth';
import { User } from '../user/user.model';

//verify email
const verifyEmailToDB = async (payload: IVerifyEmail) => {
  const { email, oneTimeCode } = payload;
  const isExistUser = await User.findOne({ email }).select('+authentication');
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  if (!oneTimeCode) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Please give the otp, check your email we send a code'
    );
  }

  const date = new Date();
  if (date > isExistUser.authentication?.expireAt!) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Otp already expired, Please try again'
    );
  }

  if (isExistUser.authentication?.oneTimeCode !== oneTimeCode) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You provided wrong otp');
  }

  await User.findOneAndUpdate(
    { _id: isExistUser._id },
    { verified: true, authentication: { oneTimeCode: null, expireAt: null } }
  );
};
export const AuthService = {
  verifyEmailToDB,
};
