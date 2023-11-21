import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('phone', 10).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.integer('role').unsigned().references('id').inTable('roles').onDelete('CASCADE').defaultTo(2)
      table.boolean('active').defaultTo(0)
      table.integer('active_code')
    
    
    
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
   
      
   
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
