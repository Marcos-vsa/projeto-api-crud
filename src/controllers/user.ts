import { Request, Response } from "express";
import { User } from "../entities/user";
import { AppDataSource } from "../database/data-source";

export const cadastrarUsuario = async (req: Request, res: Response) => {
  console.log(req.body, "Este é o corpo da requisição");

  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.cpf = req.body.cpf;

    await AppDataSource.getRepository(User).save(user);

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error, "Erro ao cadastrar usuário");
    return res
      .status(500)
      .json({ ok: false, message: "Erro ao cadastrar o usuário" });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(User).find();

    return res.status(200).json({ ok: true, users: users });
  } catch (error) {
    console.log(error, "Error ao listar usuários");
    return res
      .status(500)
      .json({ ok: false, message: "Erro ao cadastrar o usuário" });
  }
};

export const atualizarUsuario = async (req: Request, res: Response) => {
  const id = req.params.user_id;

  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: "Não existe um usuário com esse id" });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.cpf) {
      user.cpf = req.body.cpf;
    }

    await AppDataSource.getRepository(User).save(user);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error, "Error ao atualizar usuários");
    return res
      .status(500)
      .json({ ok: false, message: "Erro ao cadastrar o usuário" });
  }
};

export const deletarUsuario = async (req: Request, res: Response) => {
  const id = req.params.user_id;

  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: "Não existe um usuário com este id" });
    }

    await AppDataSource.getRepository(User).delete(user);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error, "Erro ao deletar usuário");
    return res
      .status(500)
      .json({ ok: false, message: "Erro ao deletar usuário" });
  }
};
