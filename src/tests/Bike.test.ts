import { Bike } from '../models/Bike';

test('bike attribution should be ok', () => {
  const bike = new Bike();

  bike.model = 'Caloi 2015';

  expect(bike.model).toEqual('Caloi 2015');
});
