import {Request, Response, NextFunction} from 'express';
import {RequestWithUser} from './auth';

const permit = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).send({error: 'Unauthorized'});
    }

    return next();
  }
};

export default permit;