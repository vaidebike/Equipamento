import { Totem } from '../../../models/Totem';

describe('Totem Model', () => {
  test('totem attribution should be ok', () => {
    const totem = new Totem();

    totem.id = '1';
    totem.localization = 'Rua Francisco Otaviano, 67';

    expect(totem.id).toEqual('1');
    expect(totem.localization).toEqual('Rua Francisco Otaviano, 67');
  });
});
