import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

interface IRequest {
    id: string
}

class ShowProductsService {
  public async execute({ id }: IRequest): Promise<Product> {
    const produtsRepository = getCustomRepository(ProductRepository);
    const product = await produtsRepository.findOne(id);

    if (!product) {
        throw new AppError('Product not found.');
    }
    return product;
  }
}

export default ShowProductsService;
