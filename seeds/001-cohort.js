
exports.seed = function(knex, Promise) {
  return knex('cohort').truncate()
    .then(function () {
      return knex('cohort').insert([
        {name: 'web 15'},
        {name: 'web 16'},
        {name: 'web 17'}
      ]);
    });
};
