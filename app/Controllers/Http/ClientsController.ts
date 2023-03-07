import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import Client from 'App/Models/Client'






export default class ClientsController {




 //create new client
    public async store({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email(), rules.unique({ table: 'clients', column: 'email' })]),
        password: schema.string({}, [rules.confirmed()]),
        phone: schema.string({}, [rules.minLength(10)])
        })

        const validatedData = await request.validate({ schema: validationSchema })

        if (validatedData.password !== request.input('password_confirmation')) {
        return response.status(400)
        }

        const clientExists = await Client.query().where('email', validatedData.email).first()
        if (clientExists) {
        return response.status(400)
        }

    
        const client = new Client()
        client.name = validatedData.name
        client.email = validatedData.email
        client.password = await Hash.make(validatedData.password)
        client.phone = validatedData.phone
        client.active_code = Math.floor(Math.random() * 9000) + 1000
        await client.save()

    //  const url = Route.makeSignedUrl('confirm', { id: client.id }, { expiresIn: '5min' })
    //   SendActivationCode.dispatch(client, url, client.activationCode)
        //.delay(1000)
        // .onQueue('emailcodigo')

        return response.status(201)
    }
    public async index({}: HttpContextContract) {
        return Client.all()
        }

    //update client by id 
    public async update({ request, response, params }: HttpContextContract) {
        const client = await Client.find(params.id)
        if (!client) {
            return response.status(404)
        }
        const validationSchema = schema.create({
            name: schema.string(),
            phone: schema.string({}, [rules.minLength(10)]),
            role: schema.number(),
            status: schema.boolean()
        })

        const validatedData = await request.validate({ schema: validationSchema })

        

        client.name = validatedData.name
        client.role_id = validatedData.role
        client.status = validatedData.status
        client.phone = validatedData.phone
        await client.save()
    }
    //delete client by id
    public async destroy ({ response, params }: HttpContextContract) {
        const client = await Client.find(params.id)
        if (!client) {
            
           
            return response.status(404)



        }
        await client.delete()
        return response.status(204)

    }
    //get client by email and return client id
    public async returnUser({ response, request }: HttpContextContract) {
      
        const validationSchema = schema.create({
            email: schema.string({}, [rules.email()]),
           
        })

        const validatedData = await request.validate({ schema: validationSchema })
        const client = await Client.query().where('email', validatedData.email).first()
        if (!client) {
            return response.status(404)
        }
        
        return client.id
    }
    //get client by id and return client data
    public async show({ response, params }: HttpContextContract) {
        const client = await Client.find(params.id)
        if (!client) {
            return response.status(404)
        }
        return client
    }

}
