import ctx, { canvas } from './canvas'
import partyObject from './party'

function clear () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export default function render () {
    clear() 

    // draw Bahamut
    let coordX = 0 + partyObject.boss.offset.x
    let coordY = 18 + partyObject.boss.offset.y
    ctx.drawImage(partyObject.boss.sprite, coordX, coordY, 138, 196)
    ctx.fillText(`Bahamut HP ${partyObject.boss.gameObject.hp}`, 10, 270)

    // draw Warriors of Light
    let curX = canvas.width - 36
    let curY = 0, textY = 0

    for (let partyMember of partyObject.members) {
        coordX = curX + partyMember.offset.x
        coordY = curY + partyMember.offset.y

        ctx.drawImage(partyMember.sprite, coordX, coordY, 36, 52)

        let hpText = `${partyMember.name} HP ${partyMember.gameObject.hp}`
        ctx.fillText(hpText, 425, textY + 270)

        curX -= 5
        curY += 60
        textY += 20
    }
}
