import express from 'express'

const routes = express.Router()

routes.get('/users', (req, resp) => {
  resp.json({ message: 'Hello World' })
})

export default routes