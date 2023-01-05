/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { Config, JsonDB } from 'node-json-db';

import {
  listLocks,
  registerLock,
  updateLock,
  excludeLock,
  changeLockStatus,
  addLockToVaDeBike,
  removeFromVaDeBike,
  listLock
} from '../../../controllers/lock.controller';

jest.setTimeout(30000);
describe('Lock controller', () => {
  const mockRepository = {
    createLock: jest.fn(),
    getLocks: jest.fn(),
    getLock: jest.fn(),
    updateLocks: jest.fn(),
    deleteLock: jest.fn(),
    updateLockStatus: jest.fn(),
    addRelLockToTotem: jest.fn(),
    deleteRelLockToTotem: jest.fn()
  };
  const { clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  const db = new JsonDB(new Config('database.tests.json', true, true, '/'));

  db.delete('/tb_bicicleta');
  db.delete('/tb_tranca');

  db.push('/tb_bicicleta[]', {
    id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
    brand: 'Caloi',
    model: 'Caloi 2034',
    year: 2024,
    localization: 'Rua Fran'
  });

  db.push('/tb_tranca[]', {
    id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
    year: 2035,
    model: 'Tranca Maneira',
    localization: 'Rua Raul Pompeia',
    status: 'OCUPADA'
  });

  db.push('/tb_totem[]', {
    id: '  8628961d-82c2-44b5-9927-5aabb5c4de65',
    localization: 'Rua Tonelero'
  });

  it('should create a lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      model: 'Lock 2034',
      year: 2024,
      localization: 'Rua Fran'
    };

    mockRepository.createLock.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
        brand: 'Caloi',
        model: 'Caloi 2034',
        year: 2024,
        status: 'EM_USO',
        localization: 'Rua Fran'
      }
    ]);

    await registerLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'CREATED'
      })
    );
  });

  it('should return bad request if invalid fields at register lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      model: 'Lock 2034',
      year: '2024',
      localization: 'Rua Fran'
    };

    await registerLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return bad request if missing fields at register lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      model: 'Lock 2034',
      year: 2024
    };

    await registerLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
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

  it('should get a lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

    mockRepository.getLock.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await listLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should return not found id lock id nonexistent at get a lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'a';

    mockRepository.getLock.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await listLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should update lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

    req.body = {
      year: 2035,
      model: 'Tranca Maneira',
      localization: 'Rua Raul Pompeia',
      status: 'OCUPADA'
    };

    mockRepository.updateLocks.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await updateLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should return bad request error if missing required fields at update lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

    req.body = {
      year: 2035
    };

    mockRepository.updateLocks.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await updateLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return bad request error if invalid fields at update lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

    req.body = {
      year: '2035',
      model: 'Tranca Maneira',
      localization: 'Rua Raul Pompeia',
      status: 'OCUPADA'
    };

    mockRepository.updateLocks.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await updateLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return not found if lock id is nonexistent at update lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'a';

    req.body = {
      year: 2035,
      model: 'Tranca Maneira',
      localization: 'Rua Raul Pompeia',
      status: 'OCUPADA'
    };

    mockRepository.updateLocks.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await updateLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should return not found if lock id nonexistent at delete a lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'a';

    mockRepository.deleteLock.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await excludeLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should update lock status', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';
    req.params.acao = 'REPARO_SOLICITADO';

    mockRepository.updateLockStatus.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'REPARO_SOLICITADO'
      }
    ]);

    await changeLockStatus(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should return not found if lock id id nonexistent at update lock status', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'a';
    req.params.acao = 'REPARO_SOLICITADO';

    mockRepository.updateLockStatus.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'REPARO_SOLICITADO'
      }
    ]);

    await changeLockStatus(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should return bad request if lock action is invalid at update lock status', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';
    req.params.acao = 'PARA REPARAR';

    mockRepository.updateLockStatus.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'REPARO_SOLICITADO'
      }
    ]);

    await changeLockStatus(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should create rel lock totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
    };

    mockRepository.addRelLockToTotem.mockReturnValue([
      {
        idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
      }
    ]);

    await addLockToVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'CREATED'
      })
    );
  });

  it('should return bad request if missing required fields at create rel lock totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65'
    };

    mockRepository.addRelLockToTotem.mockReturnValue([
      {
        idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
      }
    ]);

    await addLockToVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return bad request if invalid fields at create rel lock totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
      idTranca: 1
    };

    mockRepository.addRelLockToTotem.mockReturnValue([
      {
        idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
      }
    ]);

    await addLockToVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should delete rel lock totem', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
      acao: 'EM_REPARO'
    };

    mockRepository.deleteRelLockToTotem.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await removeFromVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should delete a lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

    mockRepository.deleteLock.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        year: 2035,
        model: 'Tranca Maneira',
        localization: 'Rua Raul Pompeia',
        status: 'OCUPADA'
      }
    ]);

    await excludeLock(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });
});
