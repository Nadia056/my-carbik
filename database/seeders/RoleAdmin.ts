import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import Hash from '@ioc:Adonis/Core/Hash'
export default class extends BaseSeeder {
  public async run () {
    await Client.create({
      name: 'admin',
      email: 'admin@gmial.com',
      password: await Hash.make('123456'),
      phone: '',
      role_id: 1,
      active_code: 0,
      status: true

    })

    // Write your database queries inside the run method
  }
}
