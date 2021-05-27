# Exibir usuário pelo id

> ## Caso de sucesso:
01.  ✅ Recebe uma requisição do tipo **GET** na rota **/api/users/{user_id}**
02.  ✅ Valida se a requisição foi feita por um **usuário**
03.  ✅ Valida o parâmetro **user_id**
04.  ✅ Retorna **200** com os dados do usuário

> ## Exceções:
01.  ✅ Retorna erro 404 se a API não existir
02.  ✅ Retorna erro 403 se o campo **user_id** for inválido
03.  ✅ Retorna erro 500 se der erro ao tentar encontrar o usuário pelo id