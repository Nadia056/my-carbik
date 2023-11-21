// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CarsController {

    public async store({ request, response }: HttpContextContract) {
    
          
            const validationSchema = schema.create({
            brand: schema.string(),
            model: schema.string( ),
            year: schema.number(),
            color: schema.string()
        })
       const payload =  await request.validate({ schema: validationSchema })
        Car.create(payload)
        return response.status(201)
    }

    public async index({}: HttpContextContract) {
        return Car.all()
    }

    public async update({ request, response, params }: HttpContextContract) {
        const car = await Car.findOrFail(params.id)
        car.brand = request.input('brand')  
        car.model = request.input('model')
        car.year = request.input('year')
        car.color = request.input('color')
        await car.save()
        return response.status(200)
    }
    public async destroy ({ response, params }: HttpContextContract) {
        const car = await Car.find(params.id)
        if (!car) {
            
           
            return response.status(404)



        }
        await car.delete()
        return response.status(204)

    }

    public async show({ response, params }: HttpContextContract) {
        const car = await Car.find(params.id)
        if (!car) {
            return response.status(404)
        }
        return car
    }

}

