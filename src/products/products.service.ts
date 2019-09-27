import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.floor(Math.random() * 1000).toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProduct(prodId: string): Product {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number): Product {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };

    updatedProduct.title = title || product.title;
    updatedProduct.description = desc || product.description;
    updatedProduct.price = price || product.price;

    this.products[index] = updatedProduct;

    return this.products[index];
  }

  deleteProduct(prodId: string): Product {
    const index = this.findProduct(prodId)[1];
    return this.products.splice(index, 1)[0];
  }

  private findProduct(id: string): [Product, number] {
    const index = this.products.findIndex(prod => prod.id === id);
    const product = this.products[index];
    if (!product) {
      throw new NotFoundException('Could not find the product.');
    }
    return [product, index];
  }
}
