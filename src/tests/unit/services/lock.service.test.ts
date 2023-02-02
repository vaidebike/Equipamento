/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config, JsonDB } from 'node-json-db';
import {
  createLock,
  getLocks,
  getLock,
  updateLocks,
  deleteLock,
  updateLockStatus,
  postLocklock
} from '../../../services/lock.service';
import { Lock } from '../../../models/Lock';

import { v4 as uuid } from 'uuid';
import { Bike } from '../../../models/Bike';

describe('Lock service', () => {
  const mockDB = {
    getIndex: jest.fn(),
    getData: jest.fn(),
    push: jest.fn()
  };

  const db = new JsonDB(new Config('database.test.json', true, true, '/'));

  db.delete('/locks');

  it('should get all locks', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.numero = 1;
    newLock.ano = 2021;
    newLock.localizacao = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.getData.mockReturnValue([newLock, newLock, newLock]);

    const allLocks = await getLocks(mockDB);

    expect(allLocks).toHaveLength(3);
  });

  it('should get a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.ano = 2021;
    newLock.localizacao = 'Praça I';
    newLock.numero = 1;

    newLock.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newLock);

    const lock = await getLock(mockDB, newLock.id);

    expect(lock).toEqual({ ...newLock, bicicleta: '' });
  });

  it('should return -1 if didnt find a lock by get', async () => {
    mockDB.getIndex.mockReturnValue(-1);

    const lock = await getLock(mockDB, 'invalidID');

    expect(lock).toEqual(-1);
  });

  it('should create a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.ano = 2021;
    newLock.numero = 1;
    newLock.localizacao = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.push.mockReturnValue(newLock);
    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newLock);

    const lock = await createLock(
      mockDB,
      newLock.numero,
      newLock.ano,
      newLock.modelo,
      newLock.localizacao
    );

    expect(lock).toHaveProperty('id');
    expect(lock).toHaveProperty('status');
  });

  it('should delete a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.ano = 2021;
    newLock.numero = 1;
    newLock.localizacao = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({ ...newLock, status: 'EXCLUIDA' });

    const lock = await deleteLock(mockDB, newLock.id);

    expect(lock).toEqual({ ...newLock, status: 'EXCLUIDA' });
  });

  it('should return -1 if didnt find a lock by delete', async () => {
    mockDB.getIndex.mockReturnValue(-1);

    const lock = await deleteLock(mockDB, 'invalidID');

    expect(lock).toEqual(-1);
  });

  it('should return -300 if bike status it isnt new, in use or in repair at lock a lock', async () => {
    const newLock = new Lock();

    const newBike = new Bike();
    const newLockID = uuid();

    const newBikeID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.ano = 2021;
    newLock.numero = 1;
    newLock.localizacao = 'Praça I';
    newLock.status = 'DISPONÍVEL';

    newBike.id = newBikeID;
    newBike.modelo = 'Tranca 10';
    newBike.ano = 2021;

    newBike.status = 'REPARO_SOLICITADO';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newLock);

    mockDB.getIndex.mockReturnValue(0);

    const lock = await postLocklock(mockDB, newLockID, newBikeID);

    expect(lock).toBe(-300);
  });

  it('should update a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.ano = 2021;
    newLock.numero = 1;
    newLock.localizacao = 'Praça I';
    newLock.status = 'NOVA';

    const newNumber = 1;
    const newModel = 'Tranca 10 Nova';

    const newYear = 2021;
    const newlocalizacao = 'Praça II';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({
      ...newLock,
      numero: newNumber,
      modelo: newModel,
      ano: newYear,
      localizacao: newlocalizacao
    });

    mockDB.getData.mockReturnValue({
      ...newLock,
      modelo: newModel,
      ano: newYear,
      localizacao: newlocalizacao
    });

    const lock = await updateLocks(
      mockDB,
      newNumber,
      newYear,
      newModel,
      newlocalizacao,
      newLock.id
    );

    expect(lock.id).toEqual(newLockID);
    expect(lock.status).toEqual('NOVA');
  });

  it('should update a lock status', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10';
    newLock.numero = 1;
    newLock.ano = 2021;
    newLock.localizacao = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({ ...newLock, status: 'EM_USO' });
    mockDB.getData.mockReturnValue({ ...newLock, status: 'EM_USO' });

    const lock = await updateLockStatus(mockDB, newLock.id, 'EM_USO');

    expect(lock.id).toEqual(newLockID);
    expect(lock).toEqual({ ...newLock, status: 'EM_USO' });
  });

  it('should return -1 if didnt find a lock by update', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10 Nova';
    newLock.ano = 2021;
    newLock.numero = 1;
    newLock.localizacao = 'Praça II';

    mockDB.getIndex.mockReturnValue(-1);

    const lock = await updateLocks(
      mockDB,
      newLock.numero,
      newLock.ano,
      newLock.modelo,
      newLock.localizacao,
      'invalidID'
    );

    expect(lock).toEqual(-1);
  });

  it('should return -1 if didnt find a lock by update lock status', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.modelo = 'Tranca 10 Nova';
    newLock.ano = 2021;
    newLock.localizacao = 'Praça II';

    mockDB.getIndex.mockReturnValue(-1);

    const lock = await updateLockStatus(mockDB, 'invalidID', 'DISPONIVEL');

    expect(lock).toEqual(-1);
  });
});
