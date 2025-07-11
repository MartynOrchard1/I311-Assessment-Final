import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Category from './category.js'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare description: string

  @column()
  declare image_url: string 

  @column()
  declare categoryId: number | null

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
