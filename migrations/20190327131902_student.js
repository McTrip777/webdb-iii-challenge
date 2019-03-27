
exports.up = function(knex, Promise) {
    return knex.schema.createTable('student', function(tbl){
        tbl.increments();

        tbl.string('name', 128).notNullable();

        tbl.integer('cohortId')
        .unsigned()
        .references('id')
        .inTable('cohort')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        
        tbl.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('student');
};
