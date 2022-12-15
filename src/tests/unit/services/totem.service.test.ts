/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config, JsonDB } from 'node-json-db';
import {
  createTotem,
  getTotens,
  deleteTotem,
  updateTotens
} from '../../../services/totem.service';
import { Totem } from '../../../models/Totem';

import { v4 as uuid } from 'uuid';

describe('Totem service', () => {
  const mockDB = {
    getIndex: jest.fn(),
    getData: jest.fn(),
    push: jest.fn(),
    delete: jest.fn()
  };

  const db = new JsonDB(new Config('database.test.json', true, true, '/'));

  db.delete('/totens');

  it('should get all totens', async () => {
    const newTotem = new Totem();
    const newTotemID = uuid();

    newTotem.id = newTotemID;
    newTotem.localization = 'Praça I';

    mockDB.getData.mockReturnValue([newTotem, newTotem, newTotem]);

    const allTotems = await getTotens(mockDB);

    expect(allTotems).toHaveLength(3);
  });

  it('should create a totem', async () => {
    const newTotem = new Totem();
    const newTotemID = uuid();

    newTotem.id = newTotemID;
    newTotem.localization = 'Praça I';

    mockDB.push.mockReturnValue(newTotem);
    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newTotem);

    const totem = await createTotem(mockDB, newTotem.localization);

    expect(totem).toHaveProperty('id');
    expect(totem).toHaveProperty('localization');
  });

  it('should delete a totem', async () => {
    const newTotem = new Totem();
    const newTotemID = uuid();

    newTotem.id = newTotemID;
    newTotem.localization = 'Praça I';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.delete.mockReturnValue(newTotem);

    const totem = await deleteTotem(mockDB, newTotem.id);

    expect(totem).toEqual(newTotem);
  });

  it('should return -1 if didnt find a totem by delete', async () => {
    mockDB.getIndex.mockReturnValue(-1);

    const totem = await deleteTotem(mockDB, 'invalidID');

    expect(totem).toEqual(-1);
  });

  it('should update a totem', async () => {
    const newTotem = new Totem();
    const newTotemID = uuid();

    newTotem.id = newTotemID;
    newTotem.localization = 'Praça I';

    const newLocalization = 'Praça II';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({
      ...newTotem,
      localization: newLocalization
    });

    mockDB.getData.mockReturnValue({
      ...newTotem,
      localization: newLocalization
    });

    const totem = await updateTotens(mockDB, newLocalization, newTotem.id);

    expect(totem.id).toEqual(newTotemID);
    expect(totem.localization).toEqual('Praça II');
  });

  it('should return -1 if didnt find a totem by update', async () => {
    const newTotem = new Totem();
    const newLockID = uuid();

    newTotem.id = newLockID;
    newTotem.localization = 'Praça II';

    mockDB.getIndex.mockReturnValue(-1);

    const totem = await updateTotens(
      mockDB,
      newTotem.localization,
      'invalidID'
    );

    expect(totem).toEqual(-1);
  });
});
