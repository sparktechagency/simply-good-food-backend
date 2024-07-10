import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';

const createTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...teacherData } = req.body;
    const result = await UserService.createTeacherToDB(teacherData);

    res.status(200).json({
      success: true,
      message: 'Teacher created successfully',
      data: result,
    });
  }
);

export const UserController = { createTeacher };
