import { Bike, StatusEnum } from '../../../models/Bike';

describe('Bike Model', () => {
  test('bike attribution should be ok', () => {
    const bike = new Bike();

    bike.id = '1';
    bike.marca = 'Caloi';
    bike.modelo = 'Caloi 2015';
    bike.status = StatusEnum.Available;
    bike.ano = 2015;
    bike.localizacao = 'Rua Tonelero, 100';

    expect(bike.id).toEqual('1');
    expect(bike.marca).toEqual('Caloi');
    expect(bike.modelo).toEqual('Caloi 2015');
    expect(bike.status).toEqual('DISPONIVEL');
    expect(bike.ano).toEqual(2015);
    expect(bike.localizacao).toEqual('Rua Tonelero, 100');
  });
});
