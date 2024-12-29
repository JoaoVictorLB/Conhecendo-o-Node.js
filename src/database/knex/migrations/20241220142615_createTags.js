/*
    As migrações (migrations) são semelhantes ao versionamento de código que uma plataforma como o github realiza, porém voltada para banco de dados.
    Nas migrações, existem duas operações básicas:
        UP
            - Alteração de uma tabela, banco de dados, para um novo formato
            - Processo de criar uma tabela
        DOWN
            - Alteração de rollback para versões anteriores da base
            - Processo de deletar uma tabela
*/

exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("tags");