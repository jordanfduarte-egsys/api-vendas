import { EntityRepository, Repository } from "typeorm";
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(firstName: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name: firstName,
      },
    });

    return product;
  }
}
