import { CredType, BaseCredRequest, SignatureCredRequest, MerkleCredRequest, CredChainId } from '@phi-hub/sdk';
import { Address } from 'viem';
import { readCSVFile, readImageAsBase64 } from '../utils/file';
import path from 'path';
import { credConfig } from './credConfig';

export async function createCredRequest(
  configId: number,
  executor: Address,
  credCreator: Address,
  eligibleNetwork: number,
  verifier?: Address,
  endpoint?: string,
): Promise<MerkleCredRequest | SignatureCredRequest> {
  const config = credConfig[configId];
  if (!config) {
    throw new Error(`Config not found for ID: ${configId}`);
  }

  const base64Image = await readImageAsBase64(configId);

  const baseRequest: BaseCredRequest = {
    executor: executor,
    creator: credCreator,
    credType: config.credType as CredType,
    requirement: config.title,
    imageData: base64Image,
    verificationSource: config.verificationSource,
    title: config.title,
    description: config.description,
    networks: [eligibleNetwork],
    project: config.project,
    tags: config.tags,
    relatedLinks: config.relatedLinks,
    quantity: BigInt(config.quantity),
    buyShareRoyalty: 100,
    sellShareRoyalty: 100,
  };

  let request: MerkleCredRequest | SignatureCredRequest;

  if (config.verificationType === 'SIGNATURE') {
    request = {
      ...baseRequest,
      verificationType: 'SIGNATURE',
      verifier: {
        address: verifier,
        endpoint,
      },
    } as SignatureCredRequest;
  } else if (config.verificationType === 'MERKLE') {
    const addressListPath = path.join(process.cwd(), 'src/cred/csv', `test.csv`);
    const addressList = await readCSVFile(addressListPath);

    request = {
      ...baseRequest,
      verificationType: 'MERKLE',
      addressList,
    } as MerkleCredRequest;
  } else {
    throw new Error(`Unsupported verification type`);
  }
  return request;
}
