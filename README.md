## Gympass style app.

**RFs (Requisitos funcionais)**
 * [x] Deve ser possível se cadastrar;
 * [x] Deve ser possível se autenticar;
 * [x] Deve ser possível obter o perfil de um usuário logado;
 * [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
 * [x] Deve ser possível obter seu histórico de check-ins;
 * [x] Deve ser possível o usuário buscar academias próximas (até 10km);
 * [x] Deve ser possível o usuário buscar academias pelo nome;
 * [x] Deve ser possível realizar check-in em uma academia;
 * [x] Deve ser possível validar o check-in de um usuário;
 * [x] Deve ser possível cadastrar uma academia;

**RNs (Regras de negócio)**
 * [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
 * [x] O usuário não pode fazer 2 check-ins no mesmo dia;
 * [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
 * [x] O check-in só pode ser validada até 20 minutos após ser criado;
 * [ ] O check-in só pode ser validado por administradores;
 * [ ] A academia só pode ser cadastrada por administradores;

**RNFs (Requisitos não-funcionais)**
 * [x] A senha do usuário precisa estar criptografada;
 * [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
 * [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
 * [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

**Endpoints para importar**

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Dev%20Gyms%20-%20Ignite%20Node.js%20-%20Rocketseat&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVictorMello1993%2F47a9cdc6dd46b3601c27db207b8f2419%2Fraw%2Fa9026d7a0fd51a7739fc58d972d131facb39c665%2FInsomnia_2023-06-06.json)
