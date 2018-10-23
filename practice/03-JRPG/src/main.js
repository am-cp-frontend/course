import { registerBoss, importParty } from './modules/party'
import makeCharacterObject from './modules/makeCharacterObject'
import loadAssets from './modules/assetLoader'
import gameplay from './modules/gameplay'

import jobs from './logic/jobs'

const partyArray = [
    makeCharacterObject('WHM', jobs.WhiteMage, 'assets/whm.png', true),
    makeCharacterObject('BLM', jobs.BlackMage, 'assets/blm.png', true),
    makeCharacterObject('RDM', jobs.RedMage, 'assets/rdm.png', true),
    makeCharacterObject('MNK', jobs.Monk, 'assets/mnk.png', true)
]

const boss = makeCharacterObject('Bahamut', jobs.Bahamut, 'assets/bahamut.gif', false)

loadAssets(partyArray).then(() => {
    loadAssets([boss]).then(() => {
        registerBoss(boss)
        importParty(partyArray)
        gameplay.start()
    })
})
