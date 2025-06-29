const knex = require("../database/knex");

class TagsController {
    async index(request, response){
        const user_id = request.user.id;
        /*
            .groupBy() irá agrupar as tags pela propriedade "name" desta forma evitando o 
            retorno de objetos repetidos
        */
        const tags = await knex("tags").where({ user_id }).groupBy("name");
        
        return response.json(tags);
    }
}

module.exports = TagsController;