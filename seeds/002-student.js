
exports.seed = function(knex, Promise) {
  return knex('student').truncate()
    .then(function () {
      return knex('student').insert([
        {name: 'Zech'},
        {name: 'Jake'},
        {name: 'Manny'}
      ]);
    });
};
