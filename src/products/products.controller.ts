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
import { UseGuards } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddProductDto } from './dto/addproduct.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //get all products
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  //get product by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      return product;
    }
  }

  //create product
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() addProductDto: AddProductDto): Promise<Product> {
    return this.productsService.create(addProductDto);
  }

  //update product
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return this.productsService.update(id, updateProductDto);
  }

  //delete product
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }

    await this.productsService.delete(id);

    return { message: `Product id ${id} deleted successfully` };
  }
}
