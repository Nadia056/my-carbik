import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BikeUser from 'App/Models/BikeUser'

export default class VehiclesController {
 //registrar un vehiculo a un clieb¿nte
    public async store({ request, response, auth }: HttpContextContract) {

        const { id } = auth.user!
        const { bike_id } = request.only(['bike_id',])

        if (bike_id == 'bike_id') {
            const bike = await BikeUser.create({ bike_id: bike_id, user_id: id })
            return response.status(200).json(bike)
        }
       
    }


}
