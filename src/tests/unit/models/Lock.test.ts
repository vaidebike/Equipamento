import { Lock, StatusEnum } from '../../../models/Lock';

describe('Lock Model', () => {
  test('lock attribution should be ok', () => {
    const lock = new Lock();

    lock.id = '1';
    lock.model = 'Tranca 2016';
    lock.status = StatusEnum.Locked;
    lock.year = 2016;
    lock.localization = 'Rua Tonelero, 119';

    expect(lock.id).toEqual('1');
    expect(lock.model).toEqual('Tranca 2016');
    expect(lock.status).toEqual('OCUPADA');
    expect(lock.year).toEqual(2016);
    expect(lock.localization).toEqual('Rua Tonelero, 119');
  });
});
