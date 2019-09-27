import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  HttpStatus,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    // TODO: see https://docs.nestjs.com/pipes, don't do the below
    // if (!prodTitle) {
    //   throw new BadRequestException('Title is required!');
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    return { id: generatedId };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Product {
    return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string): Product {
    return this.productsService.deleteProduct(prodId);
  }
}
