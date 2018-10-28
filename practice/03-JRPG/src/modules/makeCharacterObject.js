import { ROWS } from '../logic/abstracts'

function Offset () {
    this.x = 0
    this.y = 0
}

const makeCharacterObject = (name, className, spriteSrc, isWOL) => ({
    name,
    gameObject: new className(),
    spriteSrc,
    offset: new Offset(),
    row: isWOL ? ROWS.WOL : ROWS.BOSS
})

export default makeCharacterObject