import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('phone')
      table.string('email').unique()
      table.string('password')
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').defaultTo(2)
      table.boolean('status').defaultTo(0)
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
