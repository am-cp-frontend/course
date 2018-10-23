# Практика #3. JRPG

Для этой практики нам потребуется использовать бандлер Rollup.
Для начала убедитесь, что у вас установлена Node.js.

После этого в терминале/командной строке Node.js (если вы на Windows) наберите следующую команду:

```
npm i -g rollup
```

Вам потребуется реализовать некоторые классы из папки src/logic
этой игры.

Во-первых, это класс Character. У класса Character в итоге должны быть следующие поля:
- `maxHP`
- `hp` (оба этих поля равны `baseHP`)
- `str`
- `int`

Помимо этого, нужно создать описать класс BaseSkill.
У BaseSkill должны быть следующие поля:
- name
- potency
  
Затем, реализуйте следующие реализации BaseSkill с полями type:
- `DamageSpell`, `SPELL_TYPES.DAMAGE`
- `HealingSpell`, `SPELL_TYPES.HEALING`
- `Weaponskill`, `SPELL_TYPES.WEAPONSKILL`
  
После этого, нужно реализовать конкретные реализации
Character.\
Это следующие классы:
- `WhiteMage`. 120 хп, 4 силы, 19 интеллекта
- `BlackMage`. 120 хп, 7 силы, 20 интеллекта
- `RedMage`. 150 хп, 13 силы, 15 интеллекта
- `Monk`. 170 хп, 21 сила, 3 интеллекта
- `Bahamut`. 5500 хп, 30 силы, 20 интеллекта

У WhiteMage поле skillSet должно быть равно
`skillSets.WhiteMagic`, у BlackMage &mdash;
`skillSets.BlackMagic`, а у RedMage &mdash;
конкатенация этих двух массивов. Она выполняется с
помощью метода `array.concat(anotherArray)`. У `Monk` же скиллсет `MeleeAttack`, а у босса &mdash;
`Bahamut`.

Для расчёта объёма урона/лечения используйте формулу `potency * stat`.

Удачи!
