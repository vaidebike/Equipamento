describe('Teste teste', () => {
  test('teste', () => {
    expect('1').toEqual('1');
  });
});

// import { Lock, StatusEnum } from '../../../models/Lock';

// describe('Lock Model', () => {
//   test('lock attribution should be ok', () => {
//     const lock = new Lock();

//     lock.id = '1';
//     lock.modelo = 'Tranca 2016';
//     lock.status = StatusEnum.Locked;
//     lock.ano = 2016;
//     lock.localizacao = 'Rua Tonelero, 119';

//     expect(lock.id).toEqual('1');
//     expect(lock.modelo).toEqual('Tranca 2016');
//     expect(lock.status).toEqual('OCUPADA');
//     expect(lock.ano).toEqual(2016);
//     expect(lock.localizacao).toEqual('Rua Tonelero, 119');
//   });
// });
