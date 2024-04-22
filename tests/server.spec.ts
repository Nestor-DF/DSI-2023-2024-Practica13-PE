import 'mocha';
import { expect } from 'chai';
import request from 'request';

describe('Pruebas de las rutas de la aplicación Express', () => {
  it('post no debería añadir una carta', (done) => {
    const cardToAdd = {
      id: 123456,
      name: 'Lightning Bolt',
      manaCost: 1,
      color: 'Red',
      type: 'Instant',
      rarity: 'Common',
      rulesText: 'Lightning Bolt deals 3 damage to any target.',
      marketValue: 2.5,
    };
    request.post({ url: 'http://localhost:3000/cards?user=juan', json: cardToAdd }, (error: Error, response) => {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  it('delete valido', (done) => {
    request.delete({ url: 'http://localhost:3000/cards?id=123456' }, (error: Error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('delete no valido (no existe la carta)', (done) => {
    request.delete({ url: 'http://localhost:3000/cards?id=999' }, (error: Error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('post debería añadir una carta', (done) => {
    const cardToAdd = {
      id: 123456,
      name: 'Lightning Bolt',
      manaCost: 1,
      color: 'Red',
      type: 'Instant',
      rarity: 'Common',
      rulesText: 'Lightning Bolt deals 3 damage to any target.',
      marketValue: 2.5,
    };
    request.post({ url: 'http://localhost:3000/cards', json: cardToAdd }, (error: Error, response) => {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('get id especifico', (done) => {
    request.get({ url: 'http://localhost:3000/cards?id=123456' }, (error: Error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('get todas las cartas', (done) => {
    request.get({ url: 'http://localhost:3000/cards' }, (error: Error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('get id no existe', (done) => {
    request.get({ url: 'http://localhost:3000/cards?id=999' }, (error: Error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('pach id no existe', (done) => {
    const cardToAdd = {
      name: 'Qiyanaaaaaa',
      manaCost: 87,
    };
    request.patch({ url: 'http://localhost:3000/cards?id=00', json: cardToAdd }, (error: Error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
