# Ладья

По легенде, ладья двигается по декартовой плоскости.
У нас есть объект ладьи в ктором вам нужн реализовать
соотвествующие методы: предвижение по X, по Y и в центр
соответственно. Само передвижение отражается на объекте
ладьи как изменение её полей `currentX` и `currentY`.

Методы должны быть реализованы так, чтобы мы могли цеплять их дург на друга, или как говорят программисты - "чейнить" (от англ. chain
&mdash; цепочка).

(_Подсказка: задача на контексты выполнения._)

```javascript
rook.moveToCenter().setX(123).setY(456) // currentX = 123, currentY = 456
```