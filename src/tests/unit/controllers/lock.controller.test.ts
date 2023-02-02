describe('Teste teste', () => {
  test('teste', () => {
    expect('1').toEqual('1');
  });
});

// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Request, Response } from 'express';
// import { getMockReq, getMockRes } from '@jest-mock/express';

// import { Config, JsonDB } from 'node-json-db';

// import {
//   listLocks,
//   registerLock,
//   updateLock,
//   excludeLock,
//   changeLockStatus,
//   addLockToVaDeBike,
//   removeFromVaDeBike,
//   listLock,
//   getBikeAtLock,
//   lockLock,
//   unlockLock
// } from '../../../controllers/lock.controller';

// jest.setTimeout(30000);
// describe('Lock controller', () => {
//   const mockRepository = {
//     createLock: jest.fn(),
//     getLocks: jest.fn(),
//     getLock: jest.fn(),
//     updateLocks: jest.fn(),
//     deleteLock: jest.fn(),
//     updateLockStatus: jest.fn(),
//     addRelLockToTotem: jest.fn(),
//     deleteRelLockToTotem: jest.fn(),
//     getBikeAtLockRel: jest.fn(),
//     postLocklock: jest.fn(),
//     postUnlocklock: jest.fn()
//   };
//   const { clearMockRes } = getMockRes();

//   beforeEach(() => {
//     clearMockRes();
//   });

//   const db = new JsonDB(new Config('database.tests.json', true, true, '/'));

//   db.delete('/tb_bicicleta');
//   db.delete('/tb_tranca');

//   db.delete('/rel_totem_tranca');

//   db.push('/tb_bicicleta[]', {
//     id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
//     marca: 'Caloi',
//     modelo: 'Caloi 2034',
//     ano: 2024,
//     localizacao: 'Rua Fran'
//   });

//   db.push('/tb_bicicleta[]', {
//     id: '9c3c44c5-313a-4e04-9636-89aca282babc',
//     marca: 'Caloi',
//     modelo: 'Caloi 2034',
//     ano: 2024,
//     status: 'DISPONÍVEL',
//     localizacao: 'Rua Fran'
//   });

//   db.push('/tb_bicicleta[]', {
//     id: '9c3c44c5-313a-4e04-9636-89aca282b444',
//     marca: 'Caloi',
//     modelo: 'Caloi 2034',
//     ano: 2024,
//     status: 'DISPONÍVEL',
//     localizacao: 'Rua Fran'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'OCUPADA'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505c67',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'DISPONÍVEL'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505cc3',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'NOVA'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505cc55',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'OCUPADA'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505cc5',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'REPARO_SOLICITADO'
//   });

//   db.push('/tb_totem[]', {
//     id: '8628961d-82c2-44b5-9927-5aabb5c4de65',
//     localizacao: 'Rua Tonelero'
//   });

//   db.push('/tb_totem[]', {
//     id: '8628961d-82c2-44b5-9927-5aabb5c4de66',
//     localizacao: 'Rua Tonelero'
//   });

//   db.push('/tb_totem[]', {
//     id: '8628961d-82c2-44b5-9927-5aabb5c4de67',
//     localizacao: 'Rua Tonelero'
//   });

//   db.push('/rel_totem_tranca[]', {
//     idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de67',
//     idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc4'
//   });

//   db.push('/tb_totem[]', {
//     id: '8628961d-82c2-44b5-9927-5aabb5c4de68',
//     localizacao: 'Rua Tonelero'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505cc8',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'REPARO_SOLICITADO'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505c89',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'OCUPADA'
//   });

//   db.push('/rel_totem_tranca[]', {
//     idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de68',
//     idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc8'
//   });

//   db.push('/rel_tranca_bicicleta[]', {
//     idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc55',
//     idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282babc'
//   });

//   db.push('/rel_tranca_bicicleta[]', {
//     idTranca: 'b0702769-a6a3-4127-bd58-7e1580505c89',
//     idBicicleta: '9c3c44c5-313a-4e04-9636-89aca282b444'
//   });

//   it('should create a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       modelo: 'Lock 2034',
//       ano: 2024,
//       localizacao: 'Rua Fran'
//     };

//     mockRepository.createLock.mockReturnValue([
//       {
//         id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
//         marca: 'Caloi',
//         modelo: 'Caloi 2034',
//         ano: 2024,
//         status: 'EM_USO',
//         localizacao: 'Rua Fran'
//       }
//     ]);

//     await registerLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'CREATED'
//       })
//     );
//   });

//   it('should return bad request if invalid fields at register lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       modelo: 'Lock 2034',
//       ano: '2024',
//       localizacao: 'Rua Fran'
//     };

//     await registerLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return bad request if missing fields at register lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       modelo: 'Lock 2034',
//       ano: 2024
//     };

//     await registerLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should get all locks', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.getLocks.mockReturnValue([
//       {
//         id: 'c21240db-d3d2-460d-b0b8-10aa077a3285',
//         modelo: 'Lock 2034',
//         ano: 2024,
//         status: 'TRANCADA',
//         localizacao: 'Rua Fran'
//       }
//     ]);

//     await listLocks(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should get a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

//     mockRepository.getLock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await listLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should lock a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505c67';

//     mockRepository.postLocklock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505c67',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await lockLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should unlock a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505c89';

//     mockRepository.postUnlocklock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505c89',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'DISPONÍVEL'
//       }
//     ]);

//     await unlockLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return bad request if idlock is missing at unlock a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.postUnlocklock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505c89',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'DISPONÍVEL'
//       }
//     ]);

//     await unlockLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return bad request if lock is already occupied at lock a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

//     mockRepository.postLocklock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await lockLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return not found if id lock is nonexistent at lock a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';

//     mockRepository.postLocklock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await lockLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should return bad request if id lock is missing at lock a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.postLocklock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await lockLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should get bike at lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505cc55';

//     mockRepository.getBikeAtLockRel.mockReturnValue([
//       {
//         id: '4941f693-7af5-48d0-b86f-a796e7aeab3c',
//         marca: 'Calor',
//         modelo: 'Caloi 2034',
//         ano: 2024,
//         status: 'DISPONÍVEL',
//         localizacao: 'Rua Barata Ribeiro'
//       }
//     ]);

//     await getBikeAtLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return not found if id lock is not registred at get bike at lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';

//     mockRepository.getBikeAtLockRel.mockReturnValue([
//       {
//         id: '4941f693-7af5-48d0-b86f-a796e7aeab3c',
//         marca: 'Calor',
//         modelo: 'Caloi 2034',
//         ano: 2024,
//         status: 'DISPONÍVEL',
//         localizacao: 'Rua Barata Ribeiro'
//       }
//     ]);

//     await getBikeAtLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should return bad request if idlock is missing at get bike at lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.getBikeAtLockRel.mockReturnValue([
//       {
//         id: '4941f693-7af5-48d0-b86f-a796e7aeab3c',
//         marca: 'Calor',
//         modelo: 'Caloi 2034',
//         ano: 2024,
//         status: 'DISPONÍVEL',
//         localizacao: 'Rua Barata Ribeiro'
//       }
//     ]);

//     await getBikeAtLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return not found id lock id nonexistent at get a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';

//     mockRepository.getLock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await listLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should return bad request lock if id is missing at get a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.getLock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await listLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should update lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

//     req.body = {
//       ano: 2035,
//       modelo: 'Tranca Maneira',
//       localizacao: 'Rua Raul Pompeia',
//       status: 'OCUPADA'
//     };

//     mockRepository.updateLocks.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await updateLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return bad request error if missing required fields at update lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

//     req.body = {
//       ano: 2035
//     };

//     mockRepository.updateLocks.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await updateLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return bad request error if invalid fields at update lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

//     req.body = {
//       ano: '2035',
//       modelo: 'Tranca Maneira',
//       localizacao: 'Rua Raul Pompeia',
//       status: 'OCUPADA'
//     };

//     mockRepository.updateLocks.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await updateLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return not found if lock id is nonexistent at update lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';

//     req.body = {
//       ano: 2035,
//       modelo: 'Tranca Maneira',
//       localizacao: 'Rua Raul Pompeia',
//       status: 'OCUPADA'
//     };

//     mockRepository.updateLocks.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await updateLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should return not found if lock id nonexistent at delete a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';

//     mockRepository.deleteLock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await excludeLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should update lock status', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';
//     req.params.acao = 'REPARO_SOLICITADO';

//     mockRepository.updateLockStatus.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'REPARO_SOLICITADO'
//       }
//     ]);

//     await changeLockStatus(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return not found if lock id id nonexistent at update lock status', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';
//     req.params.acao = 'REPARO_SOLICITADO';

//     mockRepository.updateLockStatus.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'REPARO_SOLICITADO'
//       }
//     ]);

//     await changeLockStatus(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should return bad request if lock action is invalid at update lock status', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';
//     req.params.acao = 'PARA REPARAR';

//     mockRepository.updateLockStatus.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'REPARO_SOLICITADO'
//       }
//     ]);

//     await changeLockStatus(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should create rel lock totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de66',
//       idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc3'
//     };

//     mockRepository.addRelLockToTotem.mockReturnValue([
//       {
//         idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de66',
//         idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc3'
//       }
//     ]);

//     await addLockToVaDeBike(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'CREATED'
//       })
//     );
//   });

//   it('should return bad request if missing required fields at create rel lock totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65'
//     };

//     mockRepository.addRelLockToTotem.mockReturnValue([
//       {
//         idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
//         idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
//       }
//     ]);

//     await addLockToVaDeBike(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return bad request if invalid fields at create rel lock totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
//       idTranca: 1
//     };

//     mockRepository.addRelLockToTotem.mockReturnValue([
//       {
//         idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de65',
//         idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
//       }
//     ]);

//     await addLockToVaDeBike(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should delete rel lock totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de68',
//       idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc8',
//       acao: 'EM_REPARO'
//     };

//     mockRepository.deleteRelLockToTotem.mockReturnValue([
//       {
//         idTotem: '8628961d-82c2-44b5-9927-5aabb5c4de68',
//         idTranca: 'b0702769-a6a3-4127-bd58-7e1580505cc8'
//       }
//     ]);

//     await removeFromVaDeBike(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should delete a lock', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'b0702769-a6a3-4127-bd58-7e1580505ccc';

//     mockRepository.deleteLock.mockReturnValue([
//       {
//         id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//         ano: 2035,
//         modelo: 'Tranca Maneira',
//         localizacao: 'Rua Raul Pompeia',
//         status: 'OCUPADA'
//       }
//     ]);

//     await excludeLock(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });
// });
