import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import Product from '#models/product'
import Category from '#models/category'

export default class ProductsController {
  // ✅ Admin dashboard view only
  public async index({ view, request }: HttpContext) {
    const products = await Product.query().preload('category')
    const csrfToken = request.csrfToken
    return view.render('pages/dashboard', { products, csrfToken })
  }

    public async dashboard({ view, auth }: HttpContext) {
    const products = await Product.query().preload('category')
    const categories = await Category.all()

    return view.render('pages/dashboard', {
        products,
        categories,
        user: auth.user,
    })
    }


  // ✅ Render product creation form
  public async create({ view, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const categories = await Category.all()
    return view.render('pages/products/create', { csrfToken, categories })
  }

  // ✅ Handle product form submission
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

    // Create the product
    const product = await Product.create({ ...data, image_url: imagePath })

    session.flash('success', 'Product created successfully!')

    // ✅ Redirect to the new admin product details page
    return response.redirect().toRoute('admin.products.show', { id: product.id })
    }

  // ✅ Edit form
  public async edit({ params, view, response }: HttpContext) {
    const product = await Product.find(params.id)
    const categories = await Category.all()

    if (!product) {
      return response.redirect().toRoute('dashboard')
    }

    return view.render('pages/products/edit', {
      product,
      categories,
    })
  }

  // ✅ Update product
  public async update({ params, request, response, session }: HttpContext) {
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

  // ✅ Delete product
  public async destroy({ params, response, session }: HttpContext) {
    const product = await Product.find(params.id)

    if (product) {
      await product.delete()
      session.flash('success', 'Product deleted successfully!')
    }

    return response.redirect().toRoute('dashboard')
  }

    // ✅ Public/guest product detail page
    public async show({ params, view, auth, request }: HttpContext) {
    const csrfToken = request.csrfToken

    const product = await Product.query()
        .where('id', params.id)
        .preload('category')
        .firstOrFail()

    return view.render('pages/product_details', {
        product,
        user: auth.user,
        csrfToken
    })
    }
}
