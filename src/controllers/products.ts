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

    async updateProduct(req:Request,res:Response){
        const {product_id}=req.params;
        
        try {
            const product = await AppDataSource.getRepository(Product).findOne({
                where: { id: parseInt(product_id)},
            });

            if(!product){
                return res
                .status(404)
                .json({ok:false,message:"Não existe um produto conm esse id"});
            }

            if(req.body.title) product.title = req.body.title;
            if(req.body.price) product.price = req.body.price;
            if(req.body.color) product.color = req.body.color;
            if(req.body.size) product.size = req.body.size;

            await AppDataSource.getRepository(Product).save(product);

            return res.status(200).json({ok:true});
        } catch (error) {
            console.log(error,"Erro ao atualizar o usuário");
            return res
            .status(500)
            .json({ok:false,message:"Erro ao atualizar o produto"});
        }
    }

    async deleteProduct(req:Request, res:Response){
        const {product_id} = req.params;
        
        try {
            const product = await AppDataSource.getRepository(Product).findOne({
                where:{id:parseInt(product_id)},
            });

            if(!product){
                return res
                .status(404)
                .json({ok:false,message:"Não exsite um produto com este id "});
            }

            await AppDataSource.getRepository(Product).softRemove(product)
            return res.status(200).json({ok:true})
        } catch (error) {
            console.log(error,"Erro ao deletar usuário");
            return res
            .status(500)
            .json({ok:false,message:"Erro ao cadastrar o usuário"});
        }

        
    }

}

export default new ProductController();