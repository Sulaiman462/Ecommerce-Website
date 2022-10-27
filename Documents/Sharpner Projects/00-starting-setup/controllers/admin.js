const { deleteproductbyID } = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postDeleteProduct =(req,res,next)=>{
  const prodId=req.body.productId;
  deleteproductbyID(prodId)
  res.redirect('/');

}

exports.postEditProduct =(req,res,next) =>{
const prodId=req.body.productId;
const updatedtitle = req.body.title;   
const updatedimageUrl = req.body.imageUrl;
const updatedprice = req.body.price;
const updatedDescription = req.body.description;
const updatedProduct=new Product(prodId,updatedtitle,updatedimageUrl,updatedDescription,updatedprice)
updatedProduct.save()
res.redirect('/admin/products')

}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
