// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { getMockReq, getMockRes } from '@jest-mock/express';
import { listTotens } from '../../../controllers/totem.controller';

import { server } from '../../../app';

jest.setTimeout(30000);
describe('Totem controller', () => {
  const mockRepository = {
    getTotens: jest.fn(),
    getLocksAtTotem: jest.fn(),
    getBikesAtTotem: jest.fn(),
    createTotem: jest.fn(),
    updateTotens: jest.fn(),
    deleteTotem: jest.fn()
  };

  const { clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  it('should get all totens', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    mockRepository.getTotens.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
        localization: 'Rua Fran'
      }
    ]);

    await listTotens(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });
});
