const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path"); // Biblioteca para resolver os caminhos de navegações em pastas por diferentes ambientes (windows e linux possuem navegações por diretórios com sintaxes distintas)

async function sqliteConnection(){
    /*
        Toda vez que iniciamos o banco de dados (.open()) se o arquivo (neste exemplo o 'database.db') não existir, a inicialização cria automaticamente o mesmo.
        Inclusive, a função deste escopo é assíncrona pois as operações para criação e/ou abertura do arquivo relativo ao banco de dados são feitas em passos distintas, 
        e não ocorrem no mesmo momento, necessitando de uma operação assíncrona!
    */
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database,
    });

    return database;
}

module.exports = sqliteConnection;