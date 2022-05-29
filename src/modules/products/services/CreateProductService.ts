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

    const product = produtsRepository.create({
      name,
      price,
      quantity,
    });

    await produtsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
