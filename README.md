# Админка проекта цветочного магазина.
node - v20.18.3

# Стандартизация проекта
## DTO
transformServer{--Product--}ToClient - getOne, getAll
transformClient{--Product--}ToServer - create, update

## Api naming
getAll - fetchAll{--Products--}
getOne - fetchOne{--Products--}
create - create{--Products--}
update - update{--Products--}
delete - delete{--Products--}

