import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import BikeUser from 'App/Models/BikeUser'
import CarUser from 'App/Models/CarUser'

export default class VehiclesController {
 //registrar un vehiculo a un clieb¿nte
    public async storeCar({ request, response }: HttpContextContract) {

        const validationSchema = schema.create({
            car_id: schema.number(),
            user_id: schema.number()
            
        })
       const payload =  await request.validate({ schema: validationSchema })
        CarUser.create(payload)
        return 200
    }
    public async storeBike({ request, response }: HttpContextContract) {

        const validationSchema = schema.create({
            bike_id: schema.number(),
            user_id: schema.number()
            
        })
       const payload =  await request.validate({ schema: validationSchema })
        BikeUser.create(payload)
        return 200
    }


}
