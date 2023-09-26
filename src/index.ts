import "reflect-metadata"
import { AppDataSource} from "./database/data-source";
console.log("hello word");



const main =async () => {
    try {
        await AppDataSource.initialize();
        console.log('Banco de dados conectado com sucesso!')
    } catch (error) {
        console.log(error)
    }
};

main();