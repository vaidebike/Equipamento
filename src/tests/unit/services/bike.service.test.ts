/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config, JsonDB } from 'node-json-db';
import {
  createBike,
  deleteBike,
  getBike,
  getBikes,
  updateBikes,
  updateBikeStatus
} from '../../../services/bike.service';
import { Bike } from '../../../models/Bike';

import { v4 as uuid } from 'uuid';

describe('Bike service', () => {
  const mockDB = {
    getIndex: jest.fn(),
    getData: jest.fn(),
    push: jest.fn()
  };

  const db = new JsonDB(new Config('database.test.json', true, true, '/'));

  db.delete('/bikes');
  db.reload();
  beforeEach(() => {
    db.delete('/bikes');
  });

  it('should get all bikes', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi';
    newBike.model = 'Caloi 10';
    newBike.year = 2020;
    newBike.localization = 'Campus I';
    newBike.status = 'NOVA';

    mockDB.getData.mockReturnValue([newBike, newBike, newBike]);

    const allBikes = await getBikes(mockDB);

    expect(allBikes).toHaveLength(3);
  });

  it('should get a bike', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi';
    newBike.model = 'Caloi 10';
    newBike.year = 2020;
    newBike.localization = 'Campus I';
    newBike.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newBike);

    const bike = await getBike(mockDB, newBike.id);

    expect(bike).toEqual(newBike);
  });

  it('should return -1 if didnt find a bike by get', async () => {
    mockDB.getIndex.mockReturnValue(-1);

    const bike = await getBike(mockDB, 'invalidID');

    expect(bike).toEqual(-1);
  });

  it('should create a bike', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi';
    newBike.model = 'Caloi 10';
    newBike.year = 2020;
    newBike.localization = 'Campus I';
    newBike.status = 'NOVA';

    mockDB.push.mockReturnValue(newBike);
    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newBike);

    const bike = await createBike(
      mockDB,
      newBike.brand,
      newBike.model,
      newBike.year,
      newBike.localization
    );

    expect(bike).toHaveProperty('id');
    expect(bike).toHaveProperty('status');
  });

  it('should delete a bike', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi';
    newBike.model = 'Caloi 10';
    newBike.year = 2020;
    newBike.localization = 'Campus I';
    newBike.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({ ...newBike, status: 'EXCLUIDA' });

    const bike = await deleteBike(mockDB, newBike.id);

    expect(bike).toEqual({ ...newBike, status: 'EXCLUIDA' });
  });

  it('should return -1 if didnt find a bike by delete', async () => {
    mockDB.getIndex.mockReturnValue(-1);

    const bike = await deleteBike(mockDB, 'invalidID');

    expect(bike).toEqual(-1);
  });

  it('should update a bike', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi';
    newBike.model = 'Caloi 10';
    newBike.year = 2020;
    newBike.localization = 'Campus I';
    newBike.status = 'NOVA';

    const newBrand = 'Caloi Nova';
    const newModel = 'Caloi 10 Nova';
    const newYear = 2021;
    const newLocalization = 'Campus II';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({
      ...newBike,
      brand: newBrand,
      model: newModel,
      year: newYear,
      localization: newLocalization
    });

    mockDB.getData.mockReturnValue({
      ...newBike,
      brand: newBrand,
      model: newModel,
      year: newYear,
      localization: newLocalization
    });

    const bike = await updateBikes(
      mockDB,
      newBrand,
      newModel,
      newYear,
      newLocalization,
      newBike.id
    );

    expect(bike.id).toEqual(newBikeID);
    expect(bike.brand).toEqual(newBrand);
    expect(bike.status).toEqual('NOVA');
  });

  it('should update a bike status', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi';
    newBike.model = 'Caloi 10';
    newBike.year = 2020;
    newBike.localization = 'Campus I';
    newBike.status = 'NOVA';

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({ ...newBike, status: 'EM_USO' });
    mockDB.getData.mockReturnValue({ ...newBike, status: 'EM_USO' });

    const bike = await updateBikeStatus(mockDB, newBike.id, 'EM_USO');

    expect(bike.id).toEqual(newBikeID);
    expect(bike).toEqual({ ...newBike, status: 'EM_USO' });
  });

  it('should return -1 if didnt find a bike by update', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi Nova';
    newBike.model = 'Caloi 10 Nova';
    newBike.year = 2021;
    newBike.localization = 'Campus II';

    mockDB.getIndex.mockReturnValue(-1);

    const bike = await updateBikes(
      mockDB,
      newBike.brand,
      newBike.model,
      newBike.year,
      newBike.localization,
      'invalidID'
    );

    expect(bike).toEqual(-1);
  });

  it('should return -1 if didnt find a bike by update bike status', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.brand = 'Caloi Nova';
    newBike.model = 'Caloi 10 Nova';
    newBike.year = 2021;
    newBike.localization = 'Campus II';

    mockDB.getIndex.mockReturnValue(-1);

    const bike = await updateBikeStatus(mockDB, 'invalidID', 'DISPONIVEL');

    expect(bike).toEqual(-1);
  });
});
