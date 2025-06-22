import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import Product from '#models/product'
import Category from '#models/category'

export default class ProductsController {
public async index({ view, request, auth }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = 9 // Customize how many products per page

    const search = request.input('search', '').trim()
    const categoryFilter = request.input('category', '')

    // Build base query
    const query = Product.query()
      .preload('category') // preload associated category for display

    // Apply filters if any
    if (search) {
      query.where('name', 'ILIKE', `%${search}%`) // PostgreSQL friendly, or use 'LIKE' for MySQL
    }

    if (categoryFilter) {
      query.whereHas('category', (catQuery) => {
        catQuery.where('name', categoryFilter)
      })
    }

    // Execute paginated query
    const products = await query.paginate(page, perPage)
    products.baseUrl('/')

    // Get all categories for the filter dropdown
    const categories = await Category.all()

    return view.render('pages/home', {
      products,
      categories,
      search,
      categoryFilter,
      user: auth.user,
    })
  }

    async create({ view, request }: HttpContext) {
        const csrfToken = request.csrfToken
        const categories = await Category.all()
        return view.render('pages/products/create', { csrfToken, categories })
    }

    async store({ request, response, session }: HttpContext) {
        const data = request.only(['name', 'price', 'description', 'category_id'])

        // Handle image upload
        const image = request.file('image')
        let imagePath = ''

        if (image) {
            const fileName = `${cuid()}.${image.extname}`
            await image.move('./public/uploads', { name: fileName })
            imagePath = `/uploads/${fileName}`
        }

        await Product.create({ ...data, image_url: imagePath })

        session.flash('success', 'Product created successfully!')
        return response.redirect().toRoute('dashboard')
    }

    async edit({ params, view, response }: HttpContext) {
        const product = await Product.find(params.id)
        const categories = await Category.all()

        if (!product) {
            return response.redirect().toRoute('dashboard') // Optional: render 404
        }

        return view.render('pages/products/edit', {
            product,
            categories,
        })
    }

    async update({ params, request, response, session }: HttpContext) {
        const product = await Product.find(params.id)

        if (!product) {
            return response.redirect().toRoute('dashboard')
        }

        const data = request.only(['name', 'price', 'description', 'image_url', 'category_id'])

        const image = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],
        })

        if (image) {
            const fileName = `${cuid()}.${image.extname}`
            await image.move('./public/uploads', { name: fileName })
            data.image_url = `/uploads/${fileName}`
        }

        product.merge(data)
        await product.save()

        session.flash('success', 'Product updated successfully!')
        return response.redirect().toRoute('dashboard')
    }

    async destroy({ params, response, session }: HttpContext) {
        const product = await Product.find(params.id)

        if (product) {
            await product.delete()
            session.flash('success', 'Product deleted successfully!')
        }

        return response.redirect().toRoute('dashboard')
    }
}
