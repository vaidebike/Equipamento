/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config, JsonDB } from 'node-json-db';
import {
  createLock,
  getLocks,
  getLock,
  updateLocks,
  deleteLock,
  updateLockStatus
} from '../../../services/lock.service';
import { Lock } from '../../../models/Lock';

import { v4 as uuid } from 'uuid';

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
    newLock.model = 'Tranca 10';
    newLock.year = 2021;
    newLock.localization = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.getData.mockReturnValue([newLock, newLock, newLock]);

    const allLocks = await getLocks(mockDB);

    expect(allLocks).toHaveLength(3);
  });

  it('should get a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.model = 'Tranca 10';
    newLock.year = 2021;
    newLock.localization = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newLock);

    const lock = await getLock(mockDB, newLock.id);

    expect(lock).toEqual(newLock);
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
    newLock.model = 'Tranca 10';
    newLock.year = 2021;
    newLock.localization = 'Praça I';
    newLock.status = 'NOVA';

    mockDB.push.mockReturnValue(newLock);
    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newLock);

    const lock = await createLock(
      mockDB,
      newLock.year,
      newLock.model,
      newLock.localization
    );

    expect(lock).toHaveProperty('id');
    expect(lock).toHaveProperty('status');
  });

  it('should delete a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.model = 'Tranca 10';
    newLock.year = 2021;
    newLock.localization = 'Praça I';
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

  it('should update a lock', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.model = 'Tranca 10';
    newLock.year = 2021;
    newLock.localization = 'Praça I';
    newLock.status = 'NOVA';

    const newBrand = 'Tranca Nova';
    const newModel = 'Tranca 10 Nova';
    const newYear = 2021;
    const newLocalization = 'Praça II';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({
      ...newLock,
      model: newModel,
      year: newYear,
      localization: newLocalization
    });

    mockDB.getData.mockReturnValue({
      ...newLock,
      model: newModel,
      year: newYear,
      localization: newLocalization
    });

    const lock = await updateLocks(
      mockDB,
      newYear,
      newModel,
      newLocalization,
      newLock.id
    );

    expect(lock.id).toEqual(newLockID);
    expect(lock.status).toEqual('NOVA');
  });

  it('should update a lock status', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.model = 'Tranca 10';
    newLock.year = 2021;
    newLock.localization = 'Praça I';
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
    newLock.model = 'Tranca 10 Nova';
    newLock.year = 2021;
    newLock.localization = 'Praça II';

    mockDB.getIndex.mockReturnValue(-1);

    const lock = await updateLocks(
      mockDB,
      newLock.year,
      newLock.model,
      newLock.localization,
      'invalidID'
    );

    expect(lock).toEqual(-1);
  });

  it('should return -1 if didnt find a lock by update lock status', async () => {
    const newLock = new Lock();
    const newLockID = uuid();

    newLock.id = newLockID;
    newLock.model = 'Tranca 10 Nova';
    newLock.year = 2021;
    newLock.localization = 'Praça II';

    mockDB.getIndex.mockReturnValue(-1);

    const lock = await updateLockStatus(mockDB, 'invalidID', 'DISPONIVEL');

    expect(lock).toEqual(-1);
  });
});
