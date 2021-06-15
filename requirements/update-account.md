# Update account

> ## Caso de sucesso:
01. ⛔️ Recebe uma requisição do tipo **PUT** na rota **/api/users**
02. ⛔️ Valida dados obrigatórios **name** e **email**
03. ⛔️ Valida que o campo **email** é um e-mail válido
04. ⛔️ Valida se já existe um usuário com o email fornecido
05. ⛔️ Atualiza os dados de um usuário com os dados informados
06. ⛔️ Retorna 200 com os dados do usuário
> ## Exceções:
01. ⛔️ Retorna erro 404 se a API não existir
02. ⛔️ Retorna erro 400 se **name** e **email** não forem fornecidos pelo client
03. ⛔️ Retorna erro 400 se o campo **email** for um e-mail inválido
04. ⛔️ Retorna erro 403 se o email fornecido já estiver em uso
05. ⛔️ Retorna erro 500 se der erro ao tentar atualizar o usuário
