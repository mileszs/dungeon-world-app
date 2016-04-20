module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define('Character', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    race: {
      type: DataTypes.STRING,
      field: 'race'
    },
    klass: {
      type: DataTypes.STRING,
      field: 'klass'
    },
    str: {
      type: DataTypes.STRING,
      field: 'str'
    },
    con: {
      type: DataTypes.STRING,
      field: 'con'
    },
    dex: {
      type: DataTypes.STRING,
      field: 'dex'
    },
    int: {
      type: DataTypes.STRING,
      field: 'int'
    },
    wis: {
      type: DataTypes.STRING,
      field: 'wis'
    },
    cha: {
      type: DataTypes.STRING,
      field: 'cha'
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  return Character;
};
