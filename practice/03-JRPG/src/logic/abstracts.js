class Character {
    calculateAttackDamage (attackPotency = 1.0) {
        
    }

    calculateSpellDamage (spellPotency) {

    }

    calculateSpellHealing (spellPotency) {

    }
}

const SPELL_TYPES = {
    DAMAGE: 0,
    HEALING: 1,
    WEAPONSKILL: 2
}

class BasicSkill {
    
}

export default {
    Character,

    DamageSpell,
    HealingSpell,
    Weaponskill
}

export { SPELL_TYPES }