const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    /* 
    Lê-se a sintaxe abaixo da seguinte forma: 
        1. Declaramos um array de duas posições;
        2. A função .split() irá tratar de quebrar os elementos na string original separados por " " em um array;
        2. Aprimeira posição do array é descartada pois não será utilizada, por isso o espaço em branco em '[,';
        3. O segundo elemento do array baseado no split é armazenado na segunda posição do array onde iternamente está sendo criada uma variável de nome 'token';
    */
    const [, token] = authHeader.split(" ");

    try{
        /*
        Lê-se a declaração abaixo, '{ sub: user_id }' como:
        1. A propriedade 'sub' que irá existir dentro do JSON retornado em 'verify()' está recebendo um "alias" e seu nome passa a ser "user_id"
        2. Isto é equivalente a:
            const user_id = verify(token, authConfig.jwt.secret).sub;

        Obs.: O "alias" é um apelido, o nome da variável não está sendo alterado de fato!
        */
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        request.user = {
            id: Number(user_id)
        };

        return next();
    }catch{
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;