import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { AddProductDto } from './dto/addproduct.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(productDto: AddProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(productDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async update(id: number, productDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, productDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
