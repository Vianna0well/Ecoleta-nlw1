import express from 'express';

const app = express()

app.get('/users', (req, resp) => {
  console.log('Bem vindo usuário')

  resp.json([
    'Thiago',
    'Viana',
    'Silva',
  ])
})

app.listen(3333)