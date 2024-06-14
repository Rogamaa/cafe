// arquivo: menuManager.test.js
const menuManager = require('../menuManager');

test('Adiciona item ao cardápio', () => {
  expect(menuManager.addItem('Café', 2)).toBe('Item adicionado com sucesso');
});
