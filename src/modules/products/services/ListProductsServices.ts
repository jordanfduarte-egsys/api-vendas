import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"
import redisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const produtsRepository = getCustomRepository(ProductRepository);
    //const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await produtsRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }
    return products;
  }
}

export default ListProductsService;
