import { DataSource } from "typeorm"
import { User } from "../entities/user";
import { Product } from "../entities/product";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "marcao",
    password: "4321",
    database: "apisoftex",
    entities: [User,Product],
    synchronize: true,
});

