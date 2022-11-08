///////////////////////////////////////////////////////////
// OBJECTS
///////////////////////////////////////////////////////////

let index = 0

const player = {
    hull: 20,
    firepower: 6,
    accuracy: .7,
    isAlive: true,
    attack(enemy) {
        if (Math.random() < player.accuracy) {
            enemy.hull -= player.firepower
            if (enemy.hull <= 0) {
                enemy.isAlive = false
                console.log(`Congratulations! The Enemy Ship has be destroyed`)
                return `Congratulations!<br> The Enemy Ship has be destroyed<br>What would you like to do next?`
            } else {
                console.log(`Congratulations! Your laser HIT the Enemy Ship`)
                return `Congratulations!<br>Your laser HIT the Enemy Ship`
            }
        } else {
            console.log(`Unfortunately! Your laser MISSED the Enemy`)
            return `Unfortunately! Your laser MISSED the Enemy`
        }
    }
}

class EnemyShip {
    constructor(index) {
        this.num = index,
            this.hull = Math.floor(Math.random() * 3) + 7,
            this.firepower = Math.floor(Math.random() * 3) + 2,
            this.accuracy = eval((Math.random() * .2 + .6).toFixed(2)),
            this.isAlive = true
    }
    attack(player) {
        if (Math.random() < this.accuracy) {
            player.hull -= this.firepower
            if (player.hull <= 0) {
                player.isAlive = false
                console.log(`GAME OVER! You LOSE!`)
                over.style.display = 'flex'
            } else {
                console.log(`The Enemy's laser HIT YOU!`)
                return `The Enemy's laser HIT YOU!`
            }
        } else {
            console.log(`The Enemy's laser MISSED YOU!`)
            return `The Enemy's laser MISSED YOU!`
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

let playerStats = document.querySelector('.playerStats')

displayStats(playerStats, player)

let enemyStats = document.querySelector('.enemyStats')

displayStats(enemyStats, enemy)

function displayStats(stats, player) {
    stats.innerHTML = `Hull : ${player.hull} <br> 
    FirePower : ${player.firepower} <br>
    Accuracy : ${player.accuracy} <br>`
}

///////////////////////////////////////////////////////////
// MOD & BUTTONS
///////////////////////////////////////////////////////////

let attackBtn = document.querySelector('#attackBtn')

let msgModal = document.querySelector('#msgModal')

let msg = document.querySelector('#msg')

let overMsg = document.querySelector('#overMsg')

let closeMsg = document.querySelector('#closeMsg')

closeMsg.onclick = function () {
    msgModal.style.display = 'none'
}

let modBtn = document.querySelector('.modBtn')

let retreatBtn = document.querySelector('#retreatBtn')
retreatBtn.onclick = function () {
    over.style.display = 'flex'
    // location.reload()
}

let continueBtn = document.querySelector('#continueBtn')
continueBtn.onclick = function () {
    msgModal.style.display = 'none'
    index++
    attackBtn.innerHTML = 'Attack'
    attackBtn.style.color = 'green'
}

let over = document.querySelector('.over')

let playBtn = document.querySelector('#playBtn')

playBtn.onclick = function () {
    location.reload()
}


///////////////////////////////////////////////////////////

function updateEnemy(enemyArr) {
    return enemyArr.filter(element => element.isAlive === true)
}

let newEnemy = []

newEnemy = updateEnemy(enemy)

attackBtn.onclick = function () {
    // enemyIndex.innerHTML = `&nbsp;${index + 1}`

    if (index === newEnemy.length) {
        console.log('restart')
        index = 0
    }

    if (newEnemy.length === 0) {
        overMsg.innerHTML = `You WIN!`
        over.style.display = 'flex'
    }

    switch (attackBtn.innerText) {
        case 'Attack':
            console.log(`${index + 1} attack case`)
            msg.innerHTML = player.attack(newEnemy[index])
            displayStats(enemyStats, newEnemy[index])

            if (newEnemy[index].isAlive === false) {
                newEnemy = updateEnemy(newEnemy)
                if (newEnemy.length === 0) {
                    overMsg.innerHTML = `You WIN!`
                    over.style.display = 'flex'
                } else {
                    modBtn.style.display = 'flex'
                }

            } else {
                modBtn.style.display = 'none'
                attackBtn.innerHTML = 'Await Attack'
                attackBtn.style.color = 'red'
            }
            console.log(newEnemy)
            // newEnemy = updateEnemy(newEnemy)
            // console.log(newEnemy)
            break
        case 'Await Attack':
            console.log(`${index + 1} await case `)
            msg.innerHTML = newEnemy[index].attack(player)
            displayStats(playerStats, player)

            if (player.isAlive === true) {
                index++
                attackBtn.innerHTML = 'Attack'
                attackBtn.style.color = 'green'
            } else {
                over.style.display = 'flex'
            }
            break
    }
    msgModal.style.display = 'block'
}



