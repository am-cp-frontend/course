let partyArray = [], bossObject

function * partyMember () {
    let i = 0
    while (true) {
        yield partyArray[i++ % partyArray.length]
    }
}

export function addPartyMember (characterObject) {
    partyArray.push(characterObject)
}

export function importParty (anotherParty) {
    partyArray = anotherParty.slice()
}

export function registerBoss (boss) {
    bossObject = boss
}

export default {
    get boss () {
        return bossObject
    },

    get members () {
        return partyArray
    }
}

export const party = partyMember()