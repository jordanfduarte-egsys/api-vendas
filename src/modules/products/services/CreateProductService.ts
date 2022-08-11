import redisCache from '@shared/cache/RedisCache';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

interface IRequest {
  name: string,
  price: number,
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest) : Promise<Product> {
    const produtsRepository = getCustomRepository(ProductRepository);
    const productExists = await produtsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already product with this name');
    }
    //const redisCache = new RedisCache();
    const product = produtsRepository.create({
      name,
      price,
      quantity,
    });
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await produtsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
