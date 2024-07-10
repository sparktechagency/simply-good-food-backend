import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { ...verifyData } = req.body;
  const result = await AuthService.verifyEmailToDB(verifyData);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
    data: result,
  });
});

export const AuthController = {
  verifyEmail,
};
