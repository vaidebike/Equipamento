/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { Config, JsonDB } from 'node-json-db';

import { getMockReq, getMockRes } from '@jest-mock/express';
import {
  listTotens,
  registerTotem,
  listLocks,
  listBikes,
  updateTotem,
  excludeTotem
} from '../../../controllers/totem.controller';

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

  const db = new JsonDB(new Config('database.tests.json', true, true, '/'));

  db.delete('/tb_totem');

  db.push('/tb_totem[]', {
    id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
    localization: 'Rua Francisco'
  });

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

  it('should get all locks related to toten', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'e06e93ff-04e7-4d03-90be-38d765c395a8';

    mockRepository.getLocksAtTotem.mockReturnValue([
      {
        id: 'f706cd60-cfd5-43e5-9d98-f55067a8b80e',
        year: 2055,
        model: 'Tranca 2055',
        localization: 'Rua Tonelero',
        status: 'OCUPADA'
      }
    ]);

    await listLocks(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should get all bikes related to toten', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'e06e93ff-04e7-4d03-90be-38d765c395a8';

    mockRepository.getBikesAtTotem.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        brand: 'Calor',
        model: 'Caloi 2034',
        year: 2024,
        status: 'DISPONÍVEL',
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

  it('should create a totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      localization: 'Rua Fran'
    };

    mockRepository.createTotem.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
        localization: 'Rua Visconde de Pirajá'
      }
    ]);

    await registerTotem(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'CREATED'
      })
    );
  });

  it('should update a totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      localization: 'Rua Francisco'
    };

    req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

    mockRepository.updateTotens.mockReturnValue([
      {
        id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
        localization: 'Rua Francisco'
      }
    ]);

    await updateTotem(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should delete a totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

    mockRepository.deleteTotem.mockReturnValue([
      {
        id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
        localization: 'Rua Francisco'
      }
    ]);

    await excludeTotem(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should return not found if trying to delete a nonexistent totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a262';

    await excludeTotem(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });
});
