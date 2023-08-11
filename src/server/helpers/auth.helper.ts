import { type UserFields } from "../models/UserModel";
import { genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto'

/**
 *  Checks if the email is valid 
 * @param email
 * @returns boolean
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Checks if the password is valid
 * @param password
 * @returns boolean
 */
export const isValidPassword = (password: string) => password.length >= 6;

/**
 * Returns a user without vulnerable information
 * @param user
 * @returns UserFields
 */
export const getPublicUser = (user: UserFields) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { otp_code, password, ...publicUser } = user;
  return publicUser;
}

/**
 * Hashes a password
 * @param password
 * @returns Promise<string>
 */
export async function hashPassword(password: string) {
  try {
    const salt = await genSalt(10);
    const hashedPassword = hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

/**
 * Generates a session hash
 * @returns Promise<string>
 */
export const generateSessionHash = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const session_hash = randomBytes(16).toString('hex');
      resolve(session_hash);
    } catch (error) {
      reject(error);
    }
  });
};

const getRandomDigit = () => Math.floor(Math.random() * 9)

/**
 * Generates a random 6 digit OTP code 
 * @returns string
 */
export const generateOTP = () => {
  const randomDigits = Array(6).fill(0).map(() => getRandomDigit())
  const code = `${randomDigits.join('')}`
  return code;
}

/**
 * Checks if the last login is outdated
 * @param lastLogin
 * @returns boolean
 */
export const isLoginOutdated = (lastLogin: Date) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return lastLogin < oneWeekAgo;
}