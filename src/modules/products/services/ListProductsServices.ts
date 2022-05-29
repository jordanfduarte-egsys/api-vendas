import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const produtsRepository = getCustomRepository(ProductRepository);
    const products = produtsRepository.find();
    return products;
  }
}

export default ListProductsService;
