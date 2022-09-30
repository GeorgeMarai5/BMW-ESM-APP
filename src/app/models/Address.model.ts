module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        addressId: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      postal_Code: {
        type: Sequelize.BOOLEAN
      },
      date_Of_Update: {
        type: Sequelize.DATE
      }
    });
  
    return Address;
  };