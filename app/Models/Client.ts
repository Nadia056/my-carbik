import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public phone: string

  @column()
  public role: number

  @column()
  public active_code: number

  @column()
  public active: boolean


   @beforeSave()
  public static async hashPassword (user: Client) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
