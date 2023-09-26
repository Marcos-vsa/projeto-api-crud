

import express from "express";
import { atualizarUsuario, cadastrarUsuario, deletarUsuario, listarUsuarios } from "./controllers/user";

const app = express();

app.use(express.json());

//rotas
app.post("/users", cadastrarUsuario);
app.get("/users", listarUsuarios);
app.patch("/users/:user_id", atualizarUsuario);
app.delete("/users/:user_id", deletarUsuario);



export default app;
