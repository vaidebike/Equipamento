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

  it('should get all bikes', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.marca = 'Caloi';
    newBike.modelo = 'Caloi 10';
    newBike.ano = 2020;
    newBike.numero = 1;
    newBike.status = 'NOVA';

    mockDB.getData.mockReturnValue([newBike, newBike, newBike]);

    const allBikes = await getBikes(mockDB);

    expect(allBikes).toHaveLength(3);
  });

  it('should get a bike', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.marca = 'Caloi';
    newBike.modelo = 'Caloi 10';
    newBike.ano = 2020;
    newBike.numero = 1;
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
    newBike.marca = 'Caloi';
    newBike.modelo = 'Caloi 10';
    newBike.ano = 2020;
    newBike.numero = 1;
    newBike.status = 'NOVA';

    mockDB.push.mockReturnValue(newBike);
    mockDB.getIndex.mockReturnValue(0);
    mockDB.getData.mockReturnValue(newBike);

    const bike = await createBike(
      mockDB,
      newBike.numero,
      newBike.marca,
      newBike.modelo,
      newBike.ano
    );

    expect(bike).toHaveProperty('id');
    expect(bike).toHaveProperty('status');
  });

  it('should delete a bike', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.marca = 'Caloi';
    newBike.modelo = 'Caloi 10';
    newBike.ano = 2020;
    newBike.numero = 1;
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
    newBike.marca = 'Caloi';
    newBike.modelo = 'Caloi 10';
    newBike.ano = 2020;
    newBike.numero = 1;
    newBike.status = 'NOVA';

    const newBrand = 'Caloi Nova';
    const newModel = 'Caloi 10 Nova';
    const newYear = 2021;
    const newNumber = 1;

    mockDB.getIndex.mockReturnValue(0);
    mockDB.push.mockReturnValue({
      ...newBike,
      marca: newBrand,
      modelo: newModel,
      ano: newYear,
      numero: newNumber
    });

    mockDB.getData.mockReturnValue({
      ...newBike,
      marca: newBrand,
      modelo: newModel,
      ano: newYear,
      numero: newNumber
    });

    const bike = await updateBikes(
      mockDB,
      newNumber,
      newBrand,
      newModel,
      newYear,
      newBike.id
    );

    expect(bike.id).toEqual(newBikeID);
    expect(bike.marca).toEqual(newBrand);
    expect(bike.status).toEqual('NOVA');
  });

  it('should update a bike status', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.marca = 'Caloi';
    newBike.modelo = 'Caloi 10';
    newBike.ano = 2020;
    newBike.numero = 1;
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
    newBike.marca = 'Caloi Nova';
    newBike.modelo = 'Caloi 10 Nova';
    newBike.ano = 2021;
    newBike.numero = 1;

    mockDB.getIndex.mockReturnValue(-1);

    const bike = await updateBikes(
      mockDB,
      newBike.numero,
      newBike.marca,
      newBike.modelo,
      newBike.ano,
      'invalidID'
    );

    expect(bike).toEqual(-1);
  });

  it('should return -1 if didnt find a bike by update bike status', async () => {
    const newBike = new Bike();
    const newBikeID = uuid();

    newBike.id = newBikeID;
    newBike.marca = 'Caloi Nova';
    newBike.modelo = 'Caloi 10 Nova';
    newBike.ano = 2021;
    newBike.numero = 1;

    mockDB.getIndex.mockReturnValue(-1);

    const bike = await updateBikeStatus(mockDB, 'invalidID', 'DISPONIVEL');

    expect(bike).toEqual(-1);
  });
});
