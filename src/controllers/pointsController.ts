import knex from '../database/connection'
import { Request, Response } from 'express'

class PointsController {
  async index(req: Request, resp: Response) {
    const { city, uf, items } = req.query
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')
    
    return resp.json({ points })

  }
  
  async show(req: Request, resp: Response) {
    const { id } = req.params

    const pointSelected = await knex('points').where('points.id', id).first()

    if(!pointSelected){
      return resp.status(400).json({ message: 'Point not found' })
    }

    const pointItens = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')
    
    return resp.json({ point: pointSelected, items: pointItens })
  }

  async create(req: Request, resp: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body
  
    const trx = await knex.transaction()
  
    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(point)
  
    const point_id = insertedIds[0]
  
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    })
    await trx('point_items').insert(pointItems)

    await trx.commit()
  
    return resp.json({ 
      id: point_id,
      ...point 
    })
  }
}

export default PointsController