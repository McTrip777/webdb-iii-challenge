
exports.seed = function(knex, Promise) {
  return knex('student').truncate()
    .then(function () {
      return knex('student').insert([
        {name: 'Zech', cohortId: 3},
        {name: 'Jake', cohortId: 3},
        {name: 'Manny', cohortId: 2}
      ]);
    });
};
