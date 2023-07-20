import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mock products data for testing
const mockProducts: Product[] = [
  { id: 1, name: 'Product 1', type: 'Type 1', quantity: 5 },
  { id: 2, name: 'Product 2', type: 'Type 2', quantity: 10 },
];

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    jest.spyOn(productsService, 'delete').mockResolvedValue(Promise.resolve());
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      // Mocking the service method to return the mockProducts
      jest.spyOn(productsService, 'findAll').mockResolvedValue(mockProducts);

      const response = await productsController.findAll();
      expect(response).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const productId = 1;
      const mockProduct = mockProducts.find(
        (product) => product.id === productId,
      );

      // Mocking the service method to return the mockProduct
      jest.spyOn(productsService, 'findOne').mockResolvedValue(mockProduct);

      const response = await productsController.findOne(productId);
      expect(response).toEqual(mockProduct);
    });

    it('should throw a NotFoundException when product does not exist', async () => {
      const productId = 100;

      // Mocking the service method to return null (product not found)
      jest.spyOn(productsService, 'findOne').mockResolvedValue(null);

      try {
        await productsController.findOne(productId);
      } catch (error) {
        expect(error.message).toBe('Product does not exist!');
      }
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const addProductDto = {
        name: 'New Product',
        type: 'New Type',
        quantity: 15,
      };

      // Mocking the service method to return the newly created product
      jest.spyOn(productsService, 'create').mockResolvedValue({
        id: 3,
        ...addProductDto,
      });

      const response = await productsController.create(addProductDto);
      expect(response).toEqual({ id: 3, ...addProductDto });
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const productId = 1;
      const updateProductDto = {
        name: 'Updated Product',
        type: 'Updated Type',
        quantity: 20,
      };
      const mockProduct = mockProducts.find(
        (product) => product.id === productId,
      );

      // Mocking the service method to return the updated product
      jest.spyOn(productsService, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(productsService, 'update').mockResolvedValue({
        id: productId,
        ...updateProductDto,
      });

      const response = await productsController.update(
        productId,
        updateProductDto,
      );
      expect(response).toEqual({ id: productId, ...updateProductDto });
    });

    it('should throw a NotFoundException when product does not exist', async () => {
      const productId = 100;
      const updateProductDto = {
        name: 'Updated Product',
        type: 'Updated Type',
        quantity: 20,
      };

      // Mocking the service method to return null (product not found)
      jest.spyOn(productsService, 'findOne').mockResolvedValue(null);

      try {
        await productsController.update(productId, updateProductDto);
      } catch (error) {
        expect(error.message).toBe('Product does not exist!');
      }
    });
  });

  describe('delete', () => {
    it('should delete an existing product', async () => {
      const productId = 1;
      const mockProduct = mockProducts.find(
        (product) => product.id === productId,
      );
      console.log(mockProduct);
      // Mocking the service method to return the product to be deleted
      jest.spyOn(productsService, 'findOne').mockResolvedValue(mockProduct);

      const response = await productsController.delete(productId);
      expect(response).toEqual({
        message: `Product id ${productId} deleted successfully`,
      });
    });

    it('should throw a NotFoundException when product does not exist', async () => {
      const productId = 100;

      // Mocking the service method to return null (product not found)
      jest.spyOn(productsService, 'findOne').mockResolvedValue(null);

      try {
        await productsController.delete(productId);
      } catch (error) {
        expect(error.message).toBe('Product does not exist!');
      }
    });
  });
});
