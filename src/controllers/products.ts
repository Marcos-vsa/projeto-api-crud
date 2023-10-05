import { Request , Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Product } from "../entities/product";

class ProductController {
    async createProduct(req:Request , res: Response){
        const {title, price,color, size} = req.body;

        if(!title){
            return res.status(400).json({message:"O campo title é obrigatório"});
        }

        try {
            const product = await AppDataSource.getRepository(Product).save({
                title,
                price,
                color,
                size,
            });
            
            return res.status(201).json(product);
        } catch (error) {
            console.log(error);
            return res
            .status(500)
            .json({ok: false , message:"Erro ao cadastrar o produto"});
        }

    }

    async listProducts(req:Request,res:Response){
        try {
            const products = await AppDataSource.getRepository(Product).find();
            return res.status(200).json(products);
        } catch (error) {
            console.log(error);
            return res
            .status(500)
            .json({ok:false, message: "Error ao listar os produtos"});
        }
    }

}

export default new ProductController();