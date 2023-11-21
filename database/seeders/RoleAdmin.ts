import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class extends BaseSeeder {
  public async run () {
    await Client.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password:'12345678',
      phone: '',
      role: 1,
      active_code: 0,
      active: true

    })

    // Write your database queries inside the run method
  }
}
