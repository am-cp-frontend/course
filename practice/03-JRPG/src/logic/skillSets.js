import abstracts from './abstracts'

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