import 'dotenv/config';
import { txFilter_Any, txFilter_Standard } from '../verifier/utils/filter';
import { CredConfig } from '../utils/types';

// The credConfig object holds the configurations for various credentials.
// Each credential is represented as an object with a unique ID.
export const credConfig: { [key: number]: CredConfig } = {
  0: {
    title: 'Number of transactions on Basechain',
    description: 'Execute any transaction on Basechain',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: 'any',
    methodId: 'any',
    network: 8453,
    startBlock: '0',
    endBlock: 'latest',
    filterFunction: txFilter_Any,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Base',
    tags: ['Transaction'],
    relatedLinks: ['https://base.org/'],
    verificationSource: 'https://github.com/ZaK3939/phi-sdk-example',
    buyShareRoyalty: 100, // buy share royalty 1 %
    sellShareRoyalty: 100, // sell royalty 1 %
    quantity: 1, // initial share quantity
  },
  1: {
    title: 'Claim BUILD Token from Airdrop 1',
    description: 'Claim your BUILD tokens from the first airdrop campaign on Base',
    credType: 'BASIC',
    verificationType: 'MERKLE',
    contractAddress: '0x3c281a39944a2319aa653d81cfd93ca10983d234', // BUILD token contract
    network: 8453,
    project: 'BUILD',
    tags: ['Airdrop', 'Social'],
    relatedLinks: ['https://www.build.top/', 'https://basescan.org/token/0x3c281a39944a2319aa653d81cfd93ca10983d234'],
    fileName: 'test.csv', // File containing the list of addresses
    verificationSource: 'https://dune.com/queries/3942019',
    buyShareRoyalty: 100,
    sellShareRoyalty: 100,
    quantity: 1,
  },
  2: {
    title: 'Execute Swap on Uniswap (Base)',
    description: 'Perform a token swap on Uniswap on Base network',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    methodId: '0x3593564c',
    network: 8453,
    startBlock: '0',
    endBlock: 'latest',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[]) => txs.length,
    project: 'Uniswap',
    tags: ['DeFi', 'Swap'],
    relatedLinks: ['https://app.uniswap.org/'],
    verificationSource: 'https://github.com/ZaK3939/phi-sdk-example',
    buyShareRoyalty: 100,
    sellShareRoyalty: 100,
    quantity: 1,
  },
  3: {
    title: 'Mint on Highlight.xyz',
    description: 'Mint NFTs on Highlight.xyz platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xd9E58978808d17F99ccCEAb5195B052E972c0188', // just a test
    methodId: '0x02c3a65b', // mint function method ID
    network: 8453,
    startBlock: '0',
    endBlock: 'latest',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[]) => txs.length,
    project: 'Highlight.xyz',
    tags: ['NFT', 'Minting'],
    relatedLinks: ['https://highlight.xyz/'],
    verificationSource: 'https://github.com/ZaK3939/phi-sdk-example',
    buyShareRoyalty: 100,
    sellShareRoyalty: 100,
    quantity: 1,
  },
};

export const credVerifyEndpoint: { [key: number]: string | undefined } = {
  0: 'https://phi-sdk.vercel.app/api/verify/0',
  1: undefined,
  2: 'https://phi-sdk.vercel.app/api/verify/2',
  3: 'https://phi-sdk.vercel.app/api/verify/3',
};
