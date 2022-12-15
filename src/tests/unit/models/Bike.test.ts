import { Bike, StatusEnum } from '../../../models/Bike';

describe('Bike Model', () => {
  test('bike attribution should be ok', () => {
    const bike = new Bike();

    bike.id = '1';
    bike.brand = 'Caloi';
    bike.model = 'Caloi 2015';
    bike.status = StatusEnum.Available;
    bike.year = 2015;
    bike.localization = 'Rua Tonelero, 100';

    expect(bike.id).toEqual('1');
    expect(bike.brand).toEqual('Caloi');
    expect(bike.model).toEqual('Caloi 2015');
    expect(bike.status).toEqual('DISPONIVEL');
    expect(bike.year).toEqual(2015);
    expect(bike.localization).toEqual('Rua Tonelero, 100');
  });
});
