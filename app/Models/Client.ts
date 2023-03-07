import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public phone: string

  @column()
  public role_id: number

  @column()
  public active_code: number

  @column()
  public status: boolean

  static get fillable() {
    return [      'name',      'email',      'password',      'phone',      'role_id',      'active_code',      'status'    ]
  }

  static get hidden() {
    return ['password']
  }
}
