require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express");
const routes = require("./routes"); // A sintaxe "./routes/index.js" também funcionaria, porém por padrão o app busca o arquivo 'index.js' para carregá-lo automaticamente

migrationsRun();

const app = express();
const PORT= process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use(routes);
// Permite a geração de URL's diretamente para arquivos contidos na pasta UPLOADS_FOLDER, por exemplo: http://localhost:3333/files/foto1.png
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
    /* 
        Se o erro for um objeto da classe AppError, isto significa que foi um erro tratado nas outras estruturas do código, portanto foi algo identificado como erro de usuário, 
        ao qual o servidor já se preparou para lidar
    */
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });

});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));