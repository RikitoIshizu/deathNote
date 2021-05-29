'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deadPeople', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      killerId: {
        type: Sequelize.STRING
      },
      killerName: {
        type: Sequelize.STRING
      },
      causeOfDeath: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      deadPersonName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('deadPeople');
  }
};