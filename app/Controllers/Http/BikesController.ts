// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bike from 'App/Models/Bike'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class BikesController {

    public async store({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
            brand: schema.string(),
            model: schema.string(),
            year: schema.number(),
            color: schema.string()
        })
        await request.validate({ schema: validationSchema })
        const bike = new Bike()
        bike.brand = request.input('brand')
        bike.model = request.input('model')
        bike.year = request.input('year')
        bike.color = request.input('color')
        await bike.save()
        return response.status(201)
    }

    public async index({ }: HttpContextContract) {
        return Bike.all()
    }

    public async update({ request, response, params }: HttpContextContract) {
        const car = await Bike.findOrFail(params.id)
        car.brand = request.input('brand')
        car.model = request.input('model')
        car.year = request.input('year')
        car.color = request.input('color')
        await car.save()
        return response.status(200)
    }
    public async destroy({ response, params }: HttpContextContract) {
        const car = await Bike.find(params.id)
        if (!car) {


            return response.status(404)



        }
        await car.delete()
        return response.status(204)

    }

    public async show({ response, params }: HttpContextContract) {
        const car = await Bike.find(params.id)
        if (!car) {
            return response.status(404)
        }
        return car
    }

}



