import dotenv from 'dotenv';
import { Address } from 'viem';
dotenv.config();

export const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
export const CREATOR: Address = '0xD892F010cc6B13dF6BBF1f5699bd7cDF1ec23595';
