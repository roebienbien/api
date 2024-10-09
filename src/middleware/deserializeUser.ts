import { NextFunction, Request, Response } from 'express';
import { signJwt, verifyJwt } from '../utils/jwt-utils';
import { getSession } from '../db/db';

export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) return next();

  const { payload, expired } = verifyJwt(accessToken);

  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  const { payload: refresh } = expired && refreshToken ? verifyJwt(refreshToken) : { payload: null };

  if (!refresh) return next();

  // @ts-ignore
  const session = getSession(refresh.sessionId);

  if (!session) return next();

  const newAccessToken = signJwt(session, '5s');

  res.cookie('accessToken', newAccessToken, {
    maxAge: 300000, //5 mins
    httpOnly: true,
  });

  // @ts-ignore
  req.user = verifyJwt(newAccessToken).payload;

  return next();
}
