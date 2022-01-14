const { User } = require('../models');

const userData = [
  {
    id: 2,
    nome: 'Kamila',
    sobrenome: 'Raggi',
    username: 'kamilaraggi',
    senha: 'senha',
    salt:'salt',
    datacriacao: '?'
  },
  {
    id: 3,
    nome: 'Vini',
    sobrenome: 'Caribe',
    username: 'vinicaribe',
    senha: 'senha',
    salt:'salt',
    datacriacao: '?'
  },
  {
    id: 4,
    nome: 'test',
    sobrenome: 'test',
    username: 'test',
    senha: 'senha',
    salt:'salt',
    datacriacao: '?'
  }
];

 const seedUser = () => User;

module.exports = seedUser;
