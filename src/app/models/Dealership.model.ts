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
      date_Of_Update: {
        type: Sequelize.DATE
      },
      addressId: {
        type: Sequelize.DATE
      }
    });
  
    return Dealership;
  };