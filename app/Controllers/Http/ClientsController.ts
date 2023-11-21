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

        const validatedData = request.only(['name', 'email', 'password', 'password_confirmation', 'phone']);

        // Check if password matches password_confirmation
        if (validatedData.password !== validatedData.password_confirmation) {
          return 400
        }
        
        // Check if client with email already exists
        const clientExists = await Client.query().where('email', validatedData.email).first()
        if (clientExists) {
          return 401
        }
        const client = new Client()
        client.name = validatedData.name
        client.email = validatedData.email
        client.password = validatedData.password
        client.phone = validatedData.phone
        client.active_code = Math.floor(Math.random() * 9000) + 1000
        await client.save()

    //  const url = Route.makeSignedUrl('confirm', { id: client.id }, { expiresIn: '5min' })
    //   SendActivationCode.dispatch(client, url, client.activationCode)
        //.delay(1000)
        // .onQueue('emailcodigo')

        return 201
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
        client.role = validatedData.role
        client.active = validatedData.status
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
        return 200

    }
    //get client by email and return client id
    public async getuser({ request }: HttpContextContract) {
        const email = request.input('email');
        const client = await Client.query().where('email', email).first();
        
        if (!client) {
          return 400
        }
        
        return { id: client.id }
      }
    //get client by id and return client data
    public async show({ response, params }: HttpContextContract) {
        const client = await Client.find(params.id)
        if (!client) {
            return response.status(404)
        }
        return client
    }

    //return all clients
    public async allClients({ response }: HttpContextContract) {
        const clients = await Client.query().orderBy('id');
        return response.status(200).send(clients);
      }

}
