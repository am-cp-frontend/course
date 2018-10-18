# Хранилище

Ваша функция ` MakeStore(initString)` должна возвращать хранилище
(по сути, строковой буфер), у корого есть три метода:
1. `append(item)` &mdash; добавляет предмет в хранилище
2. `clear()` &mdash; очищает хранилище
3. `getBuffer()` &mdash; возвращает данные, которые находятся в хранилище.

Все добавляемые данные конкатенируются в строку, параметр
`initString` определяет начальное значение буфера. Если
`initString` не указан, то хранилище инициализируется пустой
строкой. 

Пример взаимодействия с буфером:

```javascript
let store = makeStore()
store.append("bla-bla")
console.log(store.getBuffer()) // 'bla-bla'
store.append("bla-bla") // обратите внимание, что аргумент метода append не обязательно String
console.log(store.getBuffer()) // 'bla-blabla-bla'
store.clear()
console.log(store.getBuffer) // ''
```
