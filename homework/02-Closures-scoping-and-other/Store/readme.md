# Хрнилище

Ваша функция ``` MakeStore(initString) ``` должна возвращать хранилище, у корого есть три метода:
1. ```append(intem)``` - добавляет предмет в хранилище.
2. ```clear()``` - очищает хранилше.
3. ```getBuffer()``` - возвращает данные, котоыре находятся в хранилище.

Все добавляемые данные конкатенируются в строку, параметр ```initString```  опрделяет начально значение хранилища. Если ```initString``` не указан, то хрнилище инициализируется пустой строкой. 

Пример взаимодействия:
```javascript
let store = makeStore()
store.append("bla-bla")
console.log(store.getBuffer()) // 'bla-bla'
store.append("bla-bla")
console.log(store.getBuffer()) // 'bla-blabla-bla'
store.clear()
console.log(store.getBuffer) // ''
```
