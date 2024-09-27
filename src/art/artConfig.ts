import 'dotenv/config';
import path from 'path';
import { ArtSetting } from '../utils/types';
import { oneDayFromNow, oneYearFromNow, twoDayFromNow } from '../utils/data';

export const artSettings: { [key: number]: ArtSetting } = {
  0: {
    title: 'Base Transaction Art',
    description: 'Art representing transactions on Basechain',
    project: 'Base',
    tags: ['Transaction', 'Base'],
    externalURL: 'https://base.org/',
    price: 0,
    maxSupply: 3,
    soulbound: false,
    startDate: Math.floor(Date.now() / 1000),
    endDate: twoDayFromNow,
    artType: 'IMAGE' as const,
    imagePath: path.join(process.cwd(), 'public/assets/images', 'base.png'),
  },
  1: {
    title: 'BUILD Token Claim Art',
    description: 'Art for BUILD token airdrop claimers',
    project: 'BUILD',
    tags: ['Airdrop', 'BUILD', 'Base'],
    externalURL: 'https://www.build.top/',
    price: 0.01,
    maxSupply: 5000,
    soulbound: true,
    startDate: oneDayFromNow,
    endDate: oneYearFromNow,
    artType: 'IMAGE' as const,
    imagePath: path.join(process.cwd(), 'public/assets/images', 'build.png'),
  },
  2: {
    title: 'Uniswap Swap Art',
    description: 'Dynamic art representing Uniswap swaps on Base',
    project: 'Uniswap',
    tags: ['DeFi', 'Swap', 'Uniswap', 'Base'],
    externalURL: 'https://app.uniswap.org/',
    price: 0,
    maxSupply: 1000,
    soulbound: false,
    startDate: Math.floor(Date.now() / 1000),
    endDate: oneYearFromNow,
    artType: 'API_ENDPOINT' as const,
    endpoint: 'https://phi-sdk.vercel.app/api/generate',
    previewInput: { address: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce', data: '500' }, // Need Credtype is ADVANCED
  },
  3: {
    title: 'Highlight Art',
    description: 'Dynamic art representing Highlight',
    project: 'Highlight',
    tags: ['NFT', 'Base'],
    externalURL: 'https://app.uniswap.org/',
    price: 0,
    maxSupply: 100,
    soulbound: true,
    startDate: Math.floor(Date.now() / 1000),
    endDate: oneYearFromNow,
    artType: 'API_ENDPOINT' as const,
    endpoint: 'https://phi-sdk.vercel.app/api/gif',
    previewInput: { address: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce' }, // Need Credtype is BASIC
  },
};
