export default function loadAssets (party) {
    const assetPromises = []

    for (let partyMember of party) {
        partyMember.sprite = new Image()
    }

    party.forEach(({ sprite }) => {
        assetPromises.push(new Promise(resolve => {
            sprite.addEventListener('load', resolve)
        }))
    })

    for (let partyMember of party) {
        partyMember.sprite.src = partyMember.spriteSrc
        delete partyMember.spriteSrc
    }
    
    return new Promise(resolve => {
        Promise.all(assetPromises).then(resolve)
    })
}