# Cadastro de uma função

> ## Caso de sucesso:
01. ✅ Recebe uma requisição do tipo **POST** na rota **/api/role**
02. ✅ Valida dado obrigatório **name**
03. ✅ Valida se já existe uma role com o nome fornecido
04. ✅ Cria uma role com os dados informados
05. ✅ Retorna 200 com os dados da função

> ## Exceções:
01. ✅ Retorna erro 404 se a API não existir
02. ✅ Retorna erro 400 se **name** não for fornecido pelo client
03. ✅ Retorna erro 403 se o nome fornecido já estiver criado
04. ✅ Retorna erro 403 se não passar o access token
05. ✅ Retorna erro 500 se der erro ao tentar criar a função
