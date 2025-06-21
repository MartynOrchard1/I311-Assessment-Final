import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      email: 'admin@example.com',
      password: await hash.make('password123'),
      fullName: 'Admin User',
    })
  }
}