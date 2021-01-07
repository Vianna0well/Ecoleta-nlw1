import express from 'express'
import knex from 'knex'
const routes = express.Router()

routes.get('/items', async (req, resp) => {
  const items = await knex('items').select('*');
  
  const serializedItems = items.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  })

  return resp.json(serializedItems)
})

export default routes