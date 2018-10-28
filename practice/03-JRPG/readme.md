# Практика #3. JRPG (или пробуждение древнего зла)

!["игра"][game]

Привет. Пришло время "поучаствовать" в "создании" "игры".

Но для начала кое-какие сведения о технологиях, которые нам
потребуются для выполнения этого задания. Для этой практики
потребуется использовать бандлер Rollup, поэтому убедитесь, что у
вас установлена Node.js.

## Небольшой экскурс в бандлеры для тех, кто любит читать эти справки

Что такое _бандлер_? Бандлер &mdash; кусочек программного
обеспечения, который собирает весь ваш код в один большой JS-файл.

Не думаю, что от этого предложения стало понятнее, поэтому расскажу
подробнее.\
Всё это время мы писали код в одном JS-файле, поэтому ничего
подобного нам не требовалось. Действительно, один файл, в котором
хранится всё, что нам нужно &mdash; это, в принципе, конечный
продукт JS-разработки. Однако чем больше проект, тем сложнее
станет вам, как разработчику, в нём разбираться. Тем более
будет сложнее разбираться людям, которые работают с вами в команде.
Поэтому рано или поздно код начинают разделять по разным файликам,
а файлики начинают (опционально) раскладывать по разным папочкам.
Казалось бы, в чём проблема? Давайте посмотрим.

И так, предположим, у нас есть (относительно) большое приложение,
у которого есть разные _компоненты_ и модули. Компоненты в
фронтендовом контексте &mdash; это повторно используемые логически
атомарные элементы страницы. Например, кнопка со всеми стилями.
Или футер (самая нижняя часть, footer) страницы.

Приложение в этом примере, кстати, делает страницу с меткой и
кнопкой "+", по нажатии на которую увеличивается число в метке.

```
Файловое дерево:
src/
- modules/
  - state.js
- components/
  - UIButton.js
  - UILabel.js
- main.js
```

```javascript
// UIButton.js
const UIButton = text => {
    const button = document.createElement('button')

    button.textContent = text
    button.classList.add('ui-button')

    return button
}
```

```javascript
// UILabel.js
const UILabel = text => {
    const label = document.createElement('div')

    label.textContent = text
    label.classList.add('ui-label')

    return label
}
```

```javascript
// Какой-то модуль
const StateModule = {
    state: {
        count: 0
    },

    subscribers: [],

    mutations: {
        increment: state => state.count++
    },

    commit (mutation) {
        this.mutations[mutation](this.state)

        this.subscribers.forEach(subscriber => subscriber(this.state))
    },

    subscribe (callback) {
        this.subscribers.push(callback)
    }
}
```

```javascript
// main.js

// Получаем контейнер приложения
const $app = document.querySelector('#app')

const $label = UILabel('0')
const $button = UIButton('+')

// Добавим слушателя изменения состояния к объекту состояния
StateModule.subscribe(state => $label.textContent = state.count)

$button.addEventListener('click', () => StateModule.commit('increment'))

$app.appendChild($label)
$app.appendChild($button)
```

Итак, вопрос #1. Как это всё подключать к странице?\
Ответ: очень "просто".

```html
<!-- index.html -->
<body>
    <div id='app'></div>

    <!-- пошла жара: подключаем скрипты -->
    <script src='src/modules/state.js'></script>
    <script src='src/components/UIButton.js'></script>
    <script src='src/components/UILabel.js'></script>
    <script src='src/main.js'></script>
</body>
```

Уф. Представьте, что будет, если этих файлов будет много.\
Но постойте, это не последняя из букета проблем, который нас
поджидает!

Как выглядит наше текущее дерево зависимостей?

```
main.js
- UIButton.js
- UILabel.js
- state.js
```

Это значит, что файлы со скриптами надо подключать _строго_ в том
порядке, в котором я указал выше.

А что будет, если файлов _гораздо_ больше, а дерево зависимостей
гораздо сложнее? Скажем, компоненты зависят от компонентов и
модулей, модули от модулей и компонентов и так далее.\
Одна ошибка в порядке подключения скриптов и половина приложения
(если не всё) валится со скрежетом, а консоль багряна как летний
закат.

Но и это не всё!\
По сути, сейчас мы пользуемся "фишкой" JS, которая заключается в
том, что если разные скрипты создают глобальные переменные,
то эти переменные видны в глобальном скоупе (области видимости)
для всех них. Однако, в таком случае мы пилим сук, на котором
сидим, ибо переменные могут начать ненароком пересекаться.
Что делать?

Вариант решения #1 (собственно, так делали до бандлеров):

```javascript
// UIButton.js
window.components = window.components || {}

components.UIButton = text => {/* код */}
```

```javascript
// state.js
window.modules = window.modules || {}

modules.StateModule = {/* код */}
```

(_Обратите внимание на код вида `window.components = 
window.components || {}`._

Дело в том, что операторы `||` и `&&` работают интересно в JS.

Деталь #1. Эти операторы возвращают значения.\
Деталь #2. Если говорить конкретно про оператор `||`, то
он сразу вернёт первое левый операнд, если он является
truthy значением, а если он является falsy значением (то есть
`null`, `undefined`, `''` и проч.), то он вернёт второе значение,
каким бы оно ни являлось. Таким образом, если, скажем, 
`window.components` (или, что то же, глобальная переменная
`components`) не существует, а значит, равна `undefined`, то мы 
создадим там пустой объект.)

В общем, создаём глобальные объекты `components` и `modules`
соответсвенно и кладём туда всё, что нужно. Шанс пересечения
уменьшается (хотя он всё ещё есть), код стал организованнее, все
рады, казалось бы.

Ан нет. Проблемы с порядком подключения всё ещё остались.
Модули лежат в глобалскоупе и друг от друга не изолированы. Всё 
плохо.

И тут на помощь нам приходит бандлер, решая обе проблемы эффективно
и элегантно.\
Как он это делает?

В свою очередь, на помощь бандлеру приходят ES6 модули.
Наш пример, написанный с помощью применения этого синтаксиса,
выглядит вот так:

```javascript
// UIButton.js
export default text => {
    const button = document.createElement('button')

    button.textContent = text
    button.classList.add('ui-button')

    return button
}
```

```javascript
// UILabel.js
export default text => {
    const label = document.createElement('div')

    label.textContent = text
    label.classList.add('ui-label')

    return label
}
```

```javascript
// state.js
export default {
    state: {
        count: 0
    },

    subscribers: [],

    mutations: {
        increment: state => state.count++
    },

    commit (mutation) {
        this.mutations[mutation](this.state)

        this.subscribers.forEach(subscriber => subscriber(this.state))
    },

    subscribe (callback) {
        this.subscribers.push(callback)
    }
}
```


```javascript
// main.js
import UILabel from './components/UILabel'
import UIButton from './components/UIButton'
import StateModule from './modules/state'

// Получаем контейнер приложения
const $app = document.querySelector('#app')

const $label = UILabel('0')
const $button = UIButton('+')

// Добавим слушателя изменения состояния к объекту состояния
StateModule.subscribe(state => $label.textContent = state.count)

$button.addEventListener('click', () => StateModule.commit('increment'))

$app.appendChild($label)
$app.appendChild($button)
```

Логично и элегантно.

После этого мы берём и прогоняем всё это дело через бандлер,
в нашем случае, через Rollup.

```
rollup ./src/main.js --format iife --file app.js
```

`main.js` -- входная точка, поэтому бандлер начнёт сборку
именно с этого файла.

Что получится в итоге?

```javascript
(function () {
    'use strict';

    function UILabel (text) {
        const label = document.createElement('div');

        label.textContent = text;
        label.classList.add('ui-label');

        return label
    }

    function UIButton (text) {
        const button = document.createElement('button');

        button.textContent = text;
        button.classList.add('ui-button');

        return button
    }

    // state.js
    var StateModule = {
        state: {
            count: 0
        },

        subscribers: [],

        mutations: {
            increment: state => state.count++
    		},

        commit (mutation) {
            this.mutations[mutation](this.state);

            this.subscribers.forEach(subscriber => subscriber(this.state));
        },

        subscribe (callback) {
            this.subscribers.push(callback);
        }
    };

    // main.js

    const $app = document.querySelector('#app');

    const $label = UILabel('0');
    const $button = UIButton('+');

    StateModule.subscribe(state => $label.textContent = state.count);

    $button.addEventListener('click', () => StateModule.commit('increment'));

    $app.appendChild($label);
    $app.appendChild($button);

}());
```

Ладно, хватит с вас JS-теории.

## Подготовка к выполнению задачи.

Откройте терминал (если вы на macOS/Linux/*nix-подобных системах)
или откройте меню Пуск и наберите `Node.js command prompt` в строке
поиска (если вы на Windows).\
В появившемся окне наберите следующую команду:

```
npm i -g rollup
```

Эта команда установит Rollup.

## Само задание

Вам потребуется реализовать некоторые классы из папки src/logic
этой игры.

Что это за игра? Это гипотетическая JRPG (японская ролевая игра),
вернее, экран боя из гипотетической JRPG, который играет сам в себя.

Спрайтики были _П О З А И М С Т В О В А Н Ы_ у Final Fantasy III.\
_pls square don't sue_

Сначала склонируйте репозиторий. Описание того, как это сделать,
есть в ридми предыдущей практики. Если вы уже это делали, вместо
клонирования нужно выполнить Pull. В гиткракене для этого на
верхней панели инструментов есть кнопка, на которой так и написано.

Итак, что за классы надо реализовать?\
Работать вам надо в файлах `src/logic/abstracts.js`
и `src/logic/jobs.js`. Понять, какие классы должны где находиться,
достаточно просто &mdash; они экспортируются через `export`
statement.

Во-первых, это класс `Character`, который является абстракцией
для описания всего, что движется по полю боя. У класса `Character`
в итоге должны быть следующие поля:
- `maxHP` (у каждого живого существа есть жизни)
- `hp` (оба этих поля равны `baseHP`) (`maxHP` это константа, а
  `hp` всегда удовлетворяет неравенству `0 <= hp <= maxHP`)
- `str` (у каждого героя и злодея на континенте есть хоть какой-то
  показатель силы)
- `int` (то же самое и с интеллектом)

Кроме того, у Character есть три метода.
- `calculateAttackDamage(potency)`
- `calculateSpellDamage(potency)`
- `calculateSpellHealing(potency)`

Соответсвенно все они отвечают за расчёт конечного урона, наносимого
или вылечиваемого спеллами/атаками. Здесь всё просто: есть `potency`
&mdash; множитель, который умножается на значение соответстующего
показателя (в будущем буду писать просто "стат"), чтобы получить
в результате целое число (используйте округление вниз! `Math.floor`
в помощь).

- За урон атаками отвечает сила.
- За урон спеллами отвечает интуха
- За лечение спеллами отвечает ОБОЖЕ тоже интуха (модель очень
  упрощённая, в разных финалках (играх серии Final Fantasy, прим.
  ред.) за лечение отвечает другой стат, называемый по-разному:
  то Mind (MND) как в FFXIV, то какой-нибудь Spirit, как в FFIX.)

Отлично. Помимо этого, нужно создать описать класс BaseSkill, т.е.
абстракция, описывающая любой скилл, который есть у персонажа, будь
то обычная атака, заклинание урона или заклинание лечения.

У BaseSkill должны быть следующие поля:
- `name`
- `potency` (тот самый "множитель", про который я писал выше &mdash;
  по сути, отвечает за внутриигровой баланс, ведь чем больше
  potency, тем больше конечные циферки)
  
Затем, реализуйте следующих наследников BaseSkill со следуюшими
значениями поля type:
- `DamageSpell`, `SPELL_TYPES.DAMAGE` &mdash; заклинание урона
- `HealingSpell`, `SPELL_TYPES.HEALING` &mdash; заклинание лечения
- `Weaponskill`, `SPELL_TYPES.WEAPONSKILL` &mdash; физическая атака
  
После этого, нужно реализовать конкретных наследников
Character.\
У каждой такой конкретной реализации добавляется новое поле &mdash;
`skillSet` &mdash; массив из классов-наследников BaseSpell.\
Скиллсеты я кже определил за вас, они лежат в файле
`src/logic/skillsets.js`. Можете глянуть, побаловаться с числами,
добавить что-то своё. Но вообще, вот они:

```javascript
export default {
    WhiteMagic: [
        new abstracts.HealingSpell('Cure', 400)
    ],

    Summons: [
        new abstracts.DamageSpell('Summon Ramuh', 700)
    ],

    BlackMagic: [
        new abstracts.DamageSpell('Fire', 700),
        new abstracts.DamageSpell('Thunder', 700),
        new abstracts.DamageSpell('Blizzard', 700)
    ],

    MeleeAttack: [
        new abstracts.Weaponskill('Attack', 300)
    ],

    Bahamut: [
        new abstracts.DamageSpell('Akh Morn', 150)
    ]
}
```

Если я дальше буду говорить, что у какого-то из классов есть
несколько скиллсетов, то это значит, что нужно использовать 
конкатенацию массивов. Допустим, белый маг может использовать
белую магию (спасибо, что пояснил, Дань), магию призыва и
ближнюю атаку. Тогда все эти массивы нужно склеить в один. Как это
можно сделать?

```javascript
// #1. Pre-es6: Array.prototype.concat
this.skillSet = skillSets.WhiteMagic.concat(
    skillSets.Summons,
    skillSets.MeleeAttack
)

// #2. Post-es6: destructurization
this.skillSet = [
    ...skillSets.WhiteMagic,
    ...skillSets.Summons,
    ...skillsets.MeleeAttack
]
```

Если собираетесь использовать второй метод, обязательно не забудьте
три точки! Без них получится массив с тремя вложенными массивами,
а с ними получится массив, в который смешаны все элементы из
трёх массивов.

Итак, это следующие классы (реализовывайте их в файле `jobs.js`):

### White Mage, WHM

![whm](./assets/whm.png)

Маг-хилер, использующий СИЛУ ~~ЗЕМЛИ~~ ПРИРОДЫ.

Статы: 120 хп, 4 силы, 19 интеллекта\
Скиллсет: WhiteMagic, Summons, MeleeAttack.

Интересные факты, кому не влом это читать и кто не играл в файнел
фентези: Summons здесь потому, что у белых магов в серии есть
силы владения магией призыва. Они призывают во время боя
так называемых эйдолонов &mdash; около-божественных существ,
которые, впрочем, настолько ленивы, что выдают одну сильную атаку
и тут же валят домой. Из примеров: чувак с молниями Ramuh,
ледяная бабища Shiva, морской чертила Левиафан. Сраные японцы.

### Black Mage, BLM

![blm](./assets/blm.png)

Элементальный маг, использующий силу трёх элементов &mdash;
огня (куда же без огня), молний и льда.

Статы: 120 хп, 7 силы, 20 интеллекта\
Скиллсет: BlackMagic, MeleeAttack.

Интересные факты, кому не влом это читать и кто не играл в файнел
фентези: У BLM идиотские названия улучшенных версий спеллов.
Fire -> Fira -> Firaga, Thunder -> Thundara -> Thundaga,
Blizzard -> Blizzara -> Blizzaga. Ещё в некоторых играх они
пуляются водичкой и мистическим Bio, но огонь, молнии и лёд &mdash;
это канон.

### Red Mage, RDM

![rdm](./assets/rdm.png)

"ЧЁ ТАКОЕ КРАСНЫЙ МАГ?" &mdash; спросит неподготовленный читатель.
Очень просто: это чувак, который зачем-то решил пуляться ОГОНЬКОМ и
при этом ещё и хилить. А если коротко, помесь White Mage и Black Mage.

Статы: 150 хп, 13 силы, 15 интеллекта\
Скиллсет: WhiteMagic, BlackMagic, MeleeAttack.

Интересные факты, кому не влом это читать и кто не играл в файнел
фентези: Jack of all trades, master of none. Может всё, но не
может ничего лучше, чем специализированные классы благодаря весьма
средним статам.

### Monk, MNK

![mnk](./assets/mnk.png)

Пау. Выбивает дерьмо из ворожин кулаками. Или кастетами. Вы поняли.

Статы: 170 хп, 21 сила, 3 интеллекта\
Скиллсет: MeleeAttack.

Интересные факты, кому не влом это читать и кто не играл в файнел
фентези: В FFVI была атака Blitz, для которой надо было вводить
комбо стрелочками на геймпаде. Забавно.

### Bahamut

![bahamut](./assets/bahamut.gif)

Босс этой качалки.\
~~Дракон~~ Виверн. Сильный. Наверное.

Статы: 5500 хп, 30 силы, 20 интеллекта\
Скиллсет: Bahamut. В моей версии он тупо кидается одним спеллом,
кстати.

Интересные факты, кому не влом это читать и кто не играл в файнел
фентези: То босс, то саммон для White Mage'а. Тем не менее, всегда
считается очень сильным врагом/саммоном. Вы поняли.

## Синтакис классов:

```javascript
// квадратные скобки не нужны
// если класс-наследник, пишете то, что внутри них
class Name [extends AnotherClass] {
    constructor (args) {

    }

    method (args) {

    }
}
```

## Запуск

После того, как напишете код, в терминале сначала перейдите
в ту папку, где лежит этот ридми (сделать это можно с помощью
команды `cd`).

```
cd C:\path\to\practice

или (если вы на macOS/Linux)

cd ~/Documents/path/to/practice/
```

И запустить следующую команду:

```
npm run build
```

После этого можно открывать index.html в браузере как обычно.
Причём пока эта команда работает, бандл будет обновляться
просто по сохранению изменений в файле.

Удачи!

[game]: ./game.png