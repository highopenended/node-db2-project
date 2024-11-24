exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl=>{
    tbl.increments('id') //or just tbl.increments() because 'id' is the default
    tbl.string('vin', 17).notNullable().unique()
    tbl.string('make', 128).notNullable()
    tbl.string('model', 128).notNullable()
    tbl.integer('mileage').unsigned().notNullable() // unsigned() makes it so it can't be a negative
    tbl.string('title', 128)  //.defaultTo('default val')
    tbl.string('transmission', 128)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
