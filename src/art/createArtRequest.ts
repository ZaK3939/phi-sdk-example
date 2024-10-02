import { ArtChainId, ArtCreateInput, ArtType } from '@phi-hub/sdk';
import { readFileAsBase64 } from '../utils/file';
import { Address } from 'viem';

export async function createArtRequest(params: {
  title: string;
  description: string;
  executor: Address;
  artist: Address;
  receiver: Address;
  price: number;
  maxSupply?: number;
  startDate: number;
  endDate: number;
  soulbound: boolean;
  network: ArtChainId;
  relatedLink?: string;
  imagePath?: string;
  endpoint?: string;
  previewInput?: { address: string; data?: string };
}): Promise<ArtCreateInput> {
  if (params.endpoint && params.imagePath) {
    throw new Error('Cannot have both an endpoint and an image path');
  }
  try {
    const baseArtRequest = {
      executor: params.executor,
      title: params.title,
      artist: params.artist,
      receiver: params.receiver,
      description: params.description,
      relatedLink: params.relatedLink,
      start: params.startDate,
      end: params.endDate,
      maxSupply: params.maxSupply,
      price: params.price,
      soulbound: params.soulbound,
      network: params.network,
    };

    if (params.endpoint) {
      if (!params.previewInput) {
        throw new Error('Must provide previewInput when using an endpoint');
      }

      console.log(`Fetching art from endpoint: ${params.endpoint}`);
      // API_ENDPOINT type

      return {
        ...baseArtRequest,
        artType: 'API_ENDPOINT' as const,
        endpoint: params.endpoint,
        previewInput: params.previewInput,
      };
    } else if (params.imagePath) {
      // IMAGE type
      console.log(`Processing art: ${params.imagePath}`);
      const imageData = await readFileAsBase64(params.imagePath);

      return {
        ...baseArtRequest,
        artType: 'IMAGE' as const,
        imageData,
      };
    } else {
      throw new Error('Must provide either an endpoint or an image path');
    }
  } catch (error) {
    console.error('Error in createArt:', error);
    throw error;
  }
}
