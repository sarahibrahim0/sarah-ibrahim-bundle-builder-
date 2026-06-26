import * as Product from '../models/Product.js';

export function list(req, res) {
  const { category } = req.query;
  const products = category
    ? Product.getProductsByCategory(category)
    : Product.getAllProducts();
  res.json(products);
}

export function getById(req, res) {
  const product = Product.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
}
