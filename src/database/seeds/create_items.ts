import Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Papeis e Papelao', image: 'papel.png' },
    { title: 'Vidro e Lampiao', image: 'vidro.png' },
    { title: 'Oleo de cozinha', image: 'oleo.png' },
    { title: 'Residuos Organicos', image: 'organico.png' },
    { title: 'Baterias e Pilhas', image: 'pilhas.png' },
    { title: 'Eletronico', image: 'eletronico.png' },
  ]);
}
