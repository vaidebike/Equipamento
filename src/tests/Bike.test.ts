import { Bike } from '../models/Bike';

test('bike attribution should be ok', () => {
  const bike = new Bike();

  bike.modelo = 'Caloi 2015';

  expect(bike.modelo).toEqual('Caloi 2015');
});
