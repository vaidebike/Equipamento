// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { listLocks } from '../../../controllers/lock.controller';

import { server } from '../../../app';

jest.setTimeout(30000);
describe('Lock controller', () => {
  const mockRepository = {
    createLock: jest.fn(),
    getLocks: jest.fn(),
    getLock: jest.fn(),
    updateLocks: jest.fn(),
    deleteLock: jest.fn(),
    updateLockStatus: jest.fn()
  };
  const { clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  it('should get all locks', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    mockRepository.getLocks.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3285',
        model: 'Lock 2034',
        year: 2024,
        status: 'TRANCADA',
        localization: 'Rua Fran'
      }
    ]);

    await listLocks(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });
});
