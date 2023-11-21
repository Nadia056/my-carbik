import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client' 
import Hash from '@ioc:Adonis/Core/Hash'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class LoginController {
  
  public async login({ request, response, auth }: HttpContextContract & { auth: AuthContract }) {
    const { email, password } = request.only(['email', 'password'])

    const user = await Client.findBy('email', email)
    if (!user || !(await Hash.verify(user.password, password))) {
      return 400
    }

    if (!user.active) {
      return 401
    }
    const token = await auth.use('api').generate(user)
    
  

    return{ token: token.token }
    
  }

  public async logout ({ auth }: HttpContextContract & { auth: AuthContract }) {
    await auth.use('api').revoke()
  }
}
