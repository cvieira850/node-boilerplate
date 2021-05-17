# Add role to user

> ## Caso de sucesso:
01. ⛔️ Recebe uma requisição do tipo **POST** na rota **/api/users/role**
02. ⛔️ Valida dados obrigatórios **userId** e **roleId**
03. ⛔️ Valida que o campo **userId** é um usuário válido
04. ⛔️ Valida que o campo **roleId** é uma função válida
05. ⛔️ Atualiza os dados do usuário com o id da função
06. ⛔️ Retorna 200 com os novos dados do usuário

> ## Exceções:
01. ⛔️ Retorna erro 404 se a API não existir
02. ⛔️ Retorna erro 400 se **userId** ou **roleId** não forem fornecidos pelo client
03. ⛔️ Retorna erro 401 se o campo **userId** for um usuário inválido
04. ⛔️ Retorna erro 401 se o campo **roleId** for uma função inválida
05. ⛔️ Retorna erro 500 se der erro ao tentar atualizar o usuário com o id da função