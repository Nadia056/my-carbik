import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Hash from '@ioc:Adonis/Core/Hash'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class LoginController {
  public async login({ request, response, auth }: HttpContextContract & { auth: AuthContract }) {
    const { email, password } = request.only(['email', 'password'])
    
    const user = await Client.findBy('email', email)
    if (!user || !(await Hash.verify(user.password, password))) {
      return response.status(400).json('Invalid email or password')
    }
    
    if (!user.status) {
      return response.status(401).json('Account is not activated')
    }
    
    const token = await auth.use('api').generate(user)
    return response.status(200).json(token.toJSON())
  }
}
