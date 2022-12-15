// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { getMockReq, getMockRes } from '@jest-mock/express';
import { listBikes } from '../../../controllers/bike.controller';

import { server } from '../../../app';

jest.setTimeout(30000);
describe('Bike controller', () => {
  const mockRepository = {
    getBikes: jest.fn(),
    getBike: jest.fn(),
    deleteBike: jest.fn(),
    createBike: jest.fn(),
    updateBikes: jest.fn(),
    updateBikeStatus: jest.fn()
  };
  const { clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  it('should get all bikes', async () => {
    const { res } = getMockRes();
    const req = getMockReq();
    mockRepository.getBikes.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
        brand: 'Caloi',
        model: 'Caloi 2034',
        year: 2024,
        status: 'EM_USO',
        localization: 'Rua Fran'
      }
    ]);

    await listBikes(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });
});
