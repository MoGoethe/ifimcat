import { v4 } from 'uuid';
import { redis } from '../redis';
import { confirmationPrefix, forgotPasswordPrefix } from '../constants/redisPrefixes';

export const createConfirmationUrl = (userId: number): string => {
  const token = v4();
  redis.set(confirmationPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 day expiration
  return `http://lcoalhost:4000/user/confirm/${token}`;
}

export const createForgotPasswordUrl = (userId: number): string => {
  const token = v4();
  redis.set(forgotPasswordPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 day expiration
  return `http://lcoalhost:4000/user/forgot-password/${token}`;
}