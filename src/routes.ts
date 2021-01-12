import express from 'express'

import PointsController from './controllers/pointsController'
import ItensController from './controllers/itensController'

const routes = express.Router()
const pointsController = new PointsController()
const itensController = new ItensController()

routes.get('/items', itensController.index)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post('/points', pointsController.create)

export default routes