/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { Config, JsonDB } from 'node-json-db';

import { getMockReq, getMockRes } from '@jest-mock/express';
import {
  listBikes,
  listBike,
  excludeBike,
  registerBike,
  addBikeToVaDeBike,
  removeBikeFromVaDeBike,
  updateBike,
  changeStatus
} from '../../../controllers/bike.controller';

jest.setTimeout(30000);
describe('Bike controller', () => {
  const mockRepository = {
    getBikes: jest.fn(),
    getBike: jest.fn(),
    deleteBike: jest.fn(),
    createBike: jest.fn(),
    addRelBikeToLock: jest.fn(),
    deleteRelBikeToLock: jest.fn(),
    updateBikes: jest.fn(),
    updateBikeStatus: jest.fn()
  };
  const { clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  const db = new JsonDB(new Config('database.tests.json', true, true, '/'));

  db.delete('/tb_bicicleta');
  db.delete('/tb_tranca');
  db.delete('/rel_tranca_bicicleta');

  db.push('/tb_bicicleta[]', {
    id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
    marca: 'Caloi',
    modelo: 'Caloi 2034',
    status: 'NOVA',
    ano: 2024,
    localizacao: 'Rua Fran'
  });

  db.push('/tb_bicicleta[]', {
    id: '9c3c44c5-313a-4e04-9636-89aca282b1a2',
    marca: 'Caloi',
    modelo: 'Caloi 2034',
    status: 'REPARO_SOLICITADO',
    ano: 2024,
    localizacao: 'Rua Fran'
  });

  db.push('/tb_bicicleta[]', {
    id: '9c3c44c5-313a-4e04-9636-89aca282b1a3',
    marca: 'Caloi',
    modelo: 'Caloi 2034',
    status: 'NOVA',
    ano: 2024,
    localizacao: 'Rua Fran'
  });

  db.push('/tb_tranca[]', {
    id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
    ano: 2035,
    modelo: 'Tranca Maneira',
    localizacao: 'Rua Raul Pompeia',
    status: 'OCUPADA'
  });

  db.push('/tb_tranca[]', {
    id: 'b0702769-a6a3-4127-bd58-7e1580505cc3',
    ano: 2035,
    modelo: 'Tranca Maneira',
    localizacao: 'Rua Raul Pompeia',
    status: 'OCUPADA'
  });

  db.push('/tb_tranca[]', {
    id: 'b0702769-a6a3-4127-bd58-7e1580505cc4',
    ano: 2035,
    modelo: 'Tranca Maneira',
    localizacao: 'Rua Raul Pompeia',
    status: 'DISPONÍVEL'
  });

  db.push('/rel_tranca_bicicleta[]', {
    idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc3',
    idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1a2'
  });

  it('should get all bikes', async () => {
    const { res } = getMockRes();
    const req = getMockReq();
    mockRepository.getBikes.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        status: 'EM_USO',
        localizacao: 'Rua Fran'
      }
    ]);

    await listBikes(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should get a bike', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '9c3c44c5-313a-4e04-9636-89aca282b1aa';

    mockRepository.getBike.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        localizacao: 'Rua Fran'
      }
    ]);

    await listBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should return not found if bike id is nonexistent at get a bike', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'a';

    mockRepository.getBike.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        localizacao: 'Rua Fran'
      }
    ]);

    await listBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should delete a bike', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '9c3c44c5-313a-4e04-9636-89aca282b1aa';

    mockRepository.deleteBike.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        status: 'EM_USO',
        localizacao: 'Rua Fran'
      }
    ]);

    await excludeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should create a bike', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      marca: 'Caloi',
      modelo: 'Caloi 2034',
      ano: 2024,
      localizacao: 'Rua Fran'
    };

    mockRepository.createBike.mockReturnValue([
      {
        id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        status: 'EM_USO',
        localizacao: 'Rua Fran'
      }
    ]);

    await registerBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'CREATED'
      })
    );
  });

  it('should create rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc4',
      idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1a3'
    };

    mockRepository.addRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc4',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1a3'
      }
    ]);

    await addBikeToVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'CREATED'
      })
    );
  });

  it('should return bad request if missed fields at create rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
    };

    mockRepository.addRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await addBikeToVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return bad request if invalid fields at create rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 123,
      idBicicleta: 999
    };

    mockRepository.addRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await addBikeToVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should update bike', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '9c3c44c5-313a-4e04-9636-89aca282b1aa';

    req.body = {
      marca: 'Caloi',
      modelo: 'Caloi 2034',
      ano: 2024,
      localizacao: 'Rua Fran'
    };

    mockRepository.updateBikes.mockReturnValue([
      {
        id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        STATUS: 'DISPONÍVEL',
        localizacao: 'Rua Fran'
      }
    ]);

    await updateBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should update bike status', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '9c3c44c5-313a-4e04-9636-89aca282b1aa';
    req.params.acao = 'REPARO_SOLICITADO';

    mockRepository.updateBikeStatus.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        localizacao: 'Rua Fran',
        status: 'EM_REPARO'
      }
    ]);

    await changeStatus(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });

  it('should return bad request if bike status is invalid', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = '9c3c44c5-313a-4e04-9636-89aca282b1aa';
    req.params.acao = 'PARA REPARO';

    mockRepository.updateBikeStatus.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        localizacao: 'Rua Fran',
        status: 'EM_REPARO'
      }
    ]);

    await changeStatus(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return not found if bike id is nonexistent at update status', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.params.id = 'a';
    req.params.acao = 'REPARO_SOLICITADO';

    mockRepository.updateBikeStatus.mockReturnValue([
      {
        id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
        marca: 'Caloi',
        modelo: 'Caloi 2034',
        ano: 2024,
        localizacao: 'Rua Fran',
        status: 'EM_REPARO'
      }
    ]);

    await changeStatus(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should return bad request if missing required fields at delete rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
      idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
    };

    mockRepository.deleteRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await removeBikeFromVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return bad request if invalid fields at delete rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 123,
      idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
      acao: 'EM_REPARO'
    };

    mockRepository.deleteRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await removeBikeFromVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return bad request if action field is invalid at delete rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
      idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
      acao: 'REPARAR'
    };

    mockRepository.deleteRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await removeBikeFromVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'BAD_REQUEST_ERROR'
      })
    );
  });

  it('should return not found if bike not found at rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
      idBicicleta: 'a',
      acao: 'EM_REPARO'
    };

    mockRepository.deleteRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1aa'
      }
    ]);

    await removeBikeFromVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'NOT_FOUND'
      })
    );
  });

  it('should delete rel bike lock', async () => {
    const { res } = getMockRes();
    const req = getMockReq();

    req.body = {
      idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc3',
      idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1a2',
      acao: 'EM_REPARO'
    };

    mockRepository.deleteRelBikeToLock.mockReturnValue([
      {
        idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc3',
        idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b1a2'
      }
    ]);

    await removeBikeFromVaDeBike(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'OK'
      })
    );
  });
});
