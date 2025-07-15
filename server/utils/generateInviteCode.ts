import crypto from 'crypto';
//cryptography module to generate random bytes safer than math.random()
export const generateInviteCode = ()=>crypto.randomBytes(4).toString('hex');// Generates a random invite code of 8 characters