'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Writers', [
      {
        id: 1,
        name: '夜神月',
        mail: 'yagami@gmail.com',
        age: 22,
        occupation: '新世界の神',
        password: 'yagami000',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Writers', null, {});
  }
};
