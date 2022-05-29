import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductsService from "../services/DeleteProductService";
import ListProductsService from "../services/ListProductsServices";
import ShowProductsService from "../services/ShowProductsService";
import UpdateProductsService from "../services/UpdateProductsService";

export default class ProductController {
    public async index(request: Request, response: Response) : Promise<Response> {
        const listProductService = new ListProductsService();
        const products = await listProductService.execute();
        return response.json(products);
    }

    public async show(request: Request, response: Response) : Promise<Response> {
        const { id } = request.params;
        const showProductService = new ShowProductsService();
        const product = await showProductService.execute({ id });
        return response.json(product);
    }

    public async create(request: Request, response: Response) : Promise<Response> {
        const { name, price, quantity } = request.body
        const createProductService = new CreateProductService();
        const product = await createProductService.execute({ name, price, quantity });
        return response.json(product);
    }

    public async update(request: Request, response: Response) : Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;
        const updateProductsService = new UpdateProductsService();
        const product = await updateProductsService.execute({ id, name, price, quantity });
        return response.json(product);
    }

    public async delete(request: Request, response: Response) : Promise<Response> {        
        const { id } = request.params;
        const deleteProductsService = new DeleteProductsService();
        await deleteProductsService.execute({ id });
        return response.json([]);
    }
}