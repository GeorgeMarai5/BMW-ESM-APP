module.exports = (sequelize, Sequelize) => {
    const Dealership = sequelize.define("dealership", {
        dealershipId: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      dealershipName: {
        type: Sequelize.BOOLEAN
      },
      addressId: {
        type: Sequelize.DATE
      }
    });
  
    return Dealership;
  };