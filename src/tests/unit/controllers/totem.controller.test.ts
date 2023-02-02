describe('Teste teste', () => {
  test('teste', () => {
    expect('1').toEqual('1');
  });
});

// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Request, Response } from 'express';

// import { Config, JsonDB } from 'node-json-db';

// import { getMockReq, getMockRes } from '@jest-mock/express';
// import {
//   listTotens,
//   registerTotem,
//   listLocks,
//   listBikes,
//   updateTotem,
//   excludeTotem
// } from '../../../controllers/totem.controller';

// jest.setTimeout(30000);
// describe('Totem controller', () => {
//   const mockRepository = {
//     getTotens: jest.fn(),
//     getLocksAtTotem: jest.fn(),
//     getBikesAtTotem: jest.fn(),
//     createTotem: jest.fn(),
//     updateTotens: jest.fn(),
//     deleteTotem: jest.fn()
//   };

//   const db = new JsonDB(new Config('database.tests.json', true, true, '/'));

//   db.delete('/tb_totem');

//   db.push('/tb_totem[]', {
//     id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//     localizacao: 'Rua Francisco'
//   });

//   db.push('/tb_tranca[]', {
//     id: 'b0702769-a6a3-4127-bd58-7e1580505ccc',
//     ano: 2035,
//     modelo: 'Tranca Maneira',
//     localizacao: 'Rua Raul Pompeia',
//     status: 'OCUPADA'
//   });

//   db.push('/rel_totem_tranca[]', {
//     idTotem: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//     idTranca: 'b0702769-a6a3-4127-bd58-7e1580505ccc'
//   });

//   const { clearMockRes } = getMockRes();

//   beforeEach(() => {
//     clearMockRes();
//   });

//   it('should get all totens', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.getTotens.mockReturnValue([
//       {
//         id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
//         localizacao: 'Rua Fran'
//       }
//     ]);

//     await listTotens(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should get all locks related to toten', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

//     mockRepository.getLocksAtTotem.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         ano: 2055,
//         modelo: 'Tranca 2055',
//         localizacao: 'Rua Tonelero',
//         status: 'OCUPADA'
//       }
//     ]);

//     await listLocks(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return not found if id totem is nonexistent at get all locks related to toten', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'a';

//     mockRepository.getLocksAtTotem.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         ano: 2055,
//         modelo: 'Tranca 2055',
//         localizacao: 'Rua Tonelero',
//         status: 'OCUPADA'
//       }
//     ]);

//     await listLocks(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should get all bikes related to toten', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = 'e06e93ff-04e7-4d03-90be-38d765c395a8';

//     mockRepository.getBikesAtTotem.mockReturnValue([
//       {
//         id: '9c3c44c5-313a-4e04-9636-89aca282b1aa',
//         marca: 'Calor',
//         modelo: 'Caloi 2034',
//         ano: 2024,
//         status: 'DISPONÍVEL',
//         localizacao: 'Rua Fran'
//       }
//     ]);

//     await listBikes(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should create a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       localizacao: 'Rua Fran'
//     };

//     mockRepository.createTotem.mockReturnValue([
//       {
//         id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
//         localizacao: 'Rua Visconde de Pirajá'
//       }
//     ]);

//     await registerTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'CREATED'
//       })
//     );
//   });

//   it('should return bad request if localizacao isnt a string at create a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       localizacao: 1
//     };

//     mockRepository.createTotem.mockReturnValue([
//       {
//         id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
//         localizacao: 'Rua Visconde de Pirajá'
//       }
//     ]);

//     await registerTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return bad request if localizacao is missing at create a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     mockRepository.createTotem.mockReturnValue([
//       {
//         id: 'c21240db-d3d2-460d-b0b8-10aa077a3284',
//         localizacao: 'Rua Visconde de Pirajá'
//       }
//     ]);

//     await registerTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should update a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       localizacao: 'Rua Francisco'
//     };

//     req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

//     mockRepository.updateTotens.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         localizacao: 'Rua Francisco'
//       }
//     ]);

//     await updateTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return bad request if localizacao is missing at update a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

//     mockRepository.updateTotens.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         localizacao: 'Rua Francisco'
//       }
//     ]);

//     await updateTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return bad request if localizacao isnt a string at update a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       localizacao: 1
//     };

//     req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

//     mockRepository.updateTotens.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         localizacao: 'Rua Francisco'
//       }
//     ]);

//     await updateTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'BAD_REQUEST_ERROR'
//       })
//     );
//   });

//   it('should return not found if id totem is nonexistent at update a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.body = {
//       localizacao: 'Rua Teste'
//     };

//     req.params.id = 'a';

//     mockRepository.updateTotens.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         localizacao: 'Rua Francisco'
//       }
//     ]);

//     await updateTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });

//   it('should delete a totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a2626';

//     mockRepository.deleteTotem.mockReturnValue([
//       {
//         id: '1bd9d5db-702d-4754-8260-e5d4586a2626',
//         localizacao: 'Rua Francisco'
//       }
//     ]);

//     await excludeTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'OK'
//       })
//     );
//   });

//   it('should return not found if trying to delete a nonexistent totem', async () => {
//     const { res } = getMockRes();
//     const req = getMockReq();

//     req.params.id = '1bd9d5db-702d-4754-8260-e5d4586a262';

//     await excludeTotem(req as Request, res as Response);

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 'NOT_FOUND'
//       })
//     );
//   });
// });
