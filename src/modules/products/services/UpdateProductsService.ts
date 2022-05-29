import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

interface IRequest {
    id: string,
    name: string,
    price: number,
    quantity: number
}

class UpdateProductsService {
  public async execute({id, name, price, quantity}: IRequest): Promise<Product> {
    const produtsRepository = getCustomRepository(ProductRepository);

    const product = await produtsRepository.findOne(id);

    if (!product) {
        throw new AppError('Product not found.');
    }

    const productExists = await produtsRepository.findByName(name);

    if (productExists && productExists.id != id) {
      throw new AppError('There is already product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await produtsRepository.save(product);

    return product;
  }
}

export default UpdateProductsService;
