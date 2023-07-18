import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //get all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  //get product by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('product does not exist!');
    } else {
      return product;
    }
  }

  //create product
  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  //update product
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<any> {
    return this.productsService.update(id, product);
  }

  //delete product
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if product does not exist
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('product does not exist!');
    }
    return this.productsService.delete(id);
  }
}
