
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table').insert([
        {name: 'Zech'},
        {name: 'Jake'},
        {name: 'Kaileen'}
      ]);
    });
};
