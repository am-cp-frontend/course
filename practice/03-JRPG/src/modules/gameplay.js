import partyObject, { party } from './party'
import render from './renderer'

import { SPELL_TYPES, ROWS } from '../logic/abstracts'

let gameProcess = null

function partyATB () {
    const caster = party.next().value
    const skillSet = caster.gameObject.skillSet
    const spell = skillSet[randomIndex(skillSet.length)]

    let target
    if (spell.type === SPELL_TYPES.HEALING)
        target = partyObject.members[randomIndex(partyObject.members.length)]
    else
        target = partyObject.boss
    
    processCombat(caster, spell, target)
}

function bahamutATB () {
    const skillSet = partyObject.boss.gameObject.skillSet
    const spell = skillSet[randomIndex(skillSet.length)]
    const target = partyObject.members[randomIndex(partyObject.members.length)]

    processCombat(partyObject.boss, spell, target)
}

function delay (milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
}

function randomIndex (length) {
    return Math.floor(Math.random() * length);
}

async function processCombat (caster, spell, target) {
    console.log(`${caster.name} casts ${spell.name} on ${target.name}.`)
    
    caster.offset.x = caster.row * 30
    render()

    await delay(1000)
    
    let value, damage = true
    const potency = spell.potency / 100
    
    switch (spell.type) {
        case SPELL_TYPES.DAMAGE: {
            value = caster.gameObject.calculateSpellDamage(potency)
            break
        }
        case SPELL_TYPES.HEALING: {
            value = caster.gameObject.calculateSpellHealing(potency)
            damage = false
            break
        }
        default: {
            value = caster.gameObject.calculateAttackDamage(potency)
            break
        }
    }

    caster.offset.x = caster.row * 70
    render()

    if (damage) {
        damageTarget(target, value)
        console.log(`${caster.name} hits ${target.name} for ${value.toString()} damage.`)
    } else {
        let heal = healTarget(target, value)
        console.log(`${target.name} restores ${heal.toString()} HP.`)
    }
    
    await delay(500)
    caster.offset.x = 0
    render()
}

function damageTarget (target, damage) {
    target.gameObject.hp -= damage
    if (target.gameObject.hp <= 0) {
        target.gameObject.hp = 0
        inflictKO(target)
    }
}

function healTarget (target, heal) {
    const delta = target.gameObject.maxHP - target.gameObject.hp
    if (heal >= delta) {
        target.gameObject.hp = target.gameObject.maxHP
        return delta
    } else {
        target.gameObject.hp += heal
        return heal
    }
}

function inflictKO (target) {
    console.log(`${target.name} has died.`)
    if (target.row === ROWS.WOL) {
        partyObject.members.splice(partyObject.members.indexOf(target), 1)
        if (!partyObject.members.length) {
            clearInterval(gameProcess)
            console.log('Warriors of Light are defeated.')
        }
    } else {
        clearInterval(gameProcess)
        console.log('Victory! Warriors of Light have defeated Bahamut.')
    }
}

export default {
    start () {
        render()
        
        gameProcess = setInterval(async () => {
            bahamutATB()
            await delay(2000)
            partyATB()
        }, 5000)
    },

    stop () {
        clearInterval(gameProcess)
    }
}