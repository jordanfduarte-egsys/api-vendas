import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

interface IRequest {
    id: string
}

class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<void> {
    const produtsRepository = getCustomRepository(ProductRepository);
    const product = await produtsRepository.findOne(id);

    if (!product) {
        throw new AppError('Product not found.');
    }

    await produtsRepository.remove(product);
  }
}

export default DeleteProductsService;
