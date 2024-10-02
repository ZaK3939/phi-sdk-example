import { createPublicClient } from 'viem';
import { check_cred } from '../src/verifier/check';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env') });

jest.mock('viem', () => ({
  createPublicClient: jest.fn().mockReturnValue({
    readContract: jest.fn(),
  }),
  http: jest.fn(),
}));

describe('verify', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('credential:0 should return correct result', async () => {
    const address = '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce'; // For test Addess
    const id = 0;
    const expectedCounter = 1;

    const mockReadContract = jest.fn().mockResolvedValue(expectedCounter);
    (createPublicClient as jest.Mock).mockReturnValue({
      readContract: mockReadContract,
    });

    const [result, counter] = await check_cred(address, id);

    expect(result).toBe(true);
    expect(Number(counter)).toBeGreaterThan(expectedCounter);
  });

  it('credential:0 should return false result', async () => {
    const address = '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9'; // For test Addess
    const id = 0;
    const expectedResult = '0';

    const mockReadContract = jest.fn().mockResolvedValue(expectedResult);
    (createPublicClient as jest.Mock).mockReturnValue({
      readContract: mockReadContract,
    });

    const [result, counter] = await check_cred(address, id);

    expect(result).toBe(false);
    expect(counter).toBe(expectedResult);
  });
});
