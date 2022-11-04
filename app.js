// I got it to work! I just had to call both functions stats before using the  buttons

const player = {
    hull: 20,
    firepower: 6,
    accuracy: .7,
    isAlive: true,
    attack(enemy) {
        if (Math.random() < player.accuracy) {
            enemy.hull -= player.firepower
            console.log(`HIT! Updated Enemy Hull: ${enemy.hull}`)
            return 'Congratulations!<br>Your laser attack HIT the Enemy!'
        } else {
            console.log(`MISSED! Enemy Hull: ${enemy.hull}`)
            return 'Unfortunately!<br>Your laser attack MISSED the Enemy'
        }
    }
}

class EnemyShip {
    constructor(index) {
        this.num = index,
        this.hull = Math.floor(Math.random() * 3) + 18,
        this.firepower = Math.floor(Math.random() * 3) + 2,
        this.accuracy = eval((Math.random() * .2 + .6).toFixed(2)),
        this.isAlive = true
    }
    attack(player) {
        if (Math.random() < this.accuracy) {
            player.hull -= this.firepower
            console.log(`HIT! Upated Player Hull: ${player.hull}`)
            return "Unfortunately!<br>The Enemy's laser attack HIT YOU!"
        } else {
            console.log(`MISSED! Player Hull: ${player.hull}`)
            return "Congratulations!<br>The Enemy's laser attack MISSED YOU"
        }
    }
}
///////////////////////////////////////////////////////////
// ENEMY FACTORY
///////////////////////////////////////////////////////////

let enemyNum = 6
let enemy = []

for (let i = 0; i < enemyNum; i++) {
    enemy.push(new EnemyShip(i))
}

console.log(enemy)
///////////////////////////////////////////////////////////
// STATS
///////////////////////////////////////////////////////////

let enemyIndex = document.querySelector('#enemyIndex')

enemyIndex.innerHTML = ` ${eval(enemy[0].num + 1)}`

let playerStats = document.querySelector('.playerStats')

playerStats.innerHTML = `Hull : ${player.hull} <br>
FirePower : ${player.firepower} <br>
Accuracy : ${player.accuracy} <br>`

let enemyStats = document.querySelector('.enemyStats')

function displaySats (stats, player) {
    stats.innerHTML = `Hull : ${player.hull} <br> 
    FirePower : ${player.firepower} <br>
    Accuracy : ${player.accuracy} <br>`
}

displaySats(enemyStats, enemy[0])

// enemyStats.innerHTML = `Hull : ${enemy[0].hull} <br> 
// FirePower : ${enemy[0].firepower} <br>
// Accuracy : ${enemy[0].accuracy} <br>`
///////////////////////////////////////////////////////////
// MOD BUTTON
///////////////////////////////////////////////////////////
let btn = document.querySelector('#btn')

let mgsModal = document.querySelector('#msgModal')

let msg = document.querySelector('#msg')

btn.onclick = function () {
    switch (btn.innerText) {
        case 'START':
            msg.innerHTML = "<p>Earth has been attacked by a horde of aliens! You are the captain of the USS HelloWorld, on a mission to destroy every last alien ship.</p><br><p>Battle the aliens as you try to destroy them with your lasers.</p><br><p>There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.</p>"
            break
        case 'Attack':
            msg.innerHTML = player.attack(enemy[0])
            displaySats(enemyStats, enemy[0])
            break

        case 'Await Attack':
            msg.innerHTML = enemy[0].attack(player)
            displaySats(playerStats, player)
            break
    }
    mgsModal.style.display = 'block'
}
/////////////////////////////////////////////////////////// 
// CLOSING MOD
///////////////////////////////////////////////////////////
let closeMsg = document.querySelector('#closeMsg')

closeMsg.onclick = function () {
    mgsModal.style.display = 'none'

    switch (btn.innerText) {
        case 'START':
            btn.innerHTML = 'Attack'
            btn.style.color = 'green'
            enemyIndex.style.display = 'block'
            break
        case 'Attack':
            btn.innerHTML = 'Await Attack'
            btn.style.color = 'red'
            break
        case 'Await Attack':
            btn.innerHTML = 'Attack'
            btn.style.color = 'green'
            break
    }
}