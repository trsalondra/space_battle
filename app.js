///////////////////////////////////////////////////////////
// OBJECTS
///////////////////////////////////////////////////////////
//#region

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
                return `Congratulations!<br> The Enemy Ship has be destroyed`
            } else {
                console.log(`Congratulations! Your laser HIT the Enemy Ship`)
                return `Congratulations!<br>Your laser HIT Enemy Ship`
            }
        } else {
            console.log('Unfortunately! Your laser attack MISSED the Enemy')
            return 'Unfortunately!<br>Your laser attack MISSED the Enemy'
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
                return `GAME OVER! You LOSE!`
            } else {
                console.log("The Enemy's laser HIT YOU!")
                return "The Enemy's laser HIT YOU!"
            }
        }
    }
}
//#endregion
///////////////////////////////////////////////////////////
// ENEMY FACTORY
///////////////////////////////////////////////////////////
//#region
let enemyNum = 4
let enemy = []

for (let i = 0; i < enemyNum; i++) {
    enemy.push(new EnemyShip(i))
}

//#endregion
///////////////////////////////////////////////////////////
// STATS
///////////////////////////////////////////////////////////
//#region
let playerStats = document.querySelector('.playerStats')

displayStats(playerStats, player)

let enemyStats = document.querySelector('.enemyStats')

displayStats(enemyStats, enemy)

function displayStats(stats, player) {
    stats.innerHTML = `Hull : ${player.hull} <br> 
    FirePower : ${player.firepower} <br>
    Accuracy : ${player.accuracy} <br>`
}
//#endregion
///////////////////////////////////////////////////////////
// MOD BUTTON
///////////////////////////////////////////////////////////
//#region
let playBtn = document.querySelector('#playBtn')

let mgsModal = document.querySelector('#msgModal')

let msg = document.querySelector('#msg')

let closeMsg = document.querySelector('#closeMsg')

///////////////////////////////////////////////////////////

function updateEnemy(enemyArr) {
    return enemyArr.filter(element => element.isAlive === true)
}

let updatedEnemy = []

updatedEnemy = updateEnemy(enemy)
console.log(updatedEnemy)

playBtn.onclick = function () {

    // problem is that is goes to await attack for the same ship that has been destroyed

    switch (playBtn.innerText) {
        case 'Attack':
            console.log(`${index + 1} attack case`)

            msg.innerHTML = player.attack(updatedEnemy[index])
            if (updatedEnemy[index].isAlive === true) {
                playBtn.innerHTML = 'Await Attack'
                playBtn.style.color = 'red'
            } else {
            index++
            enemyIndex.innerHTML = `&nbsp;${enemy[index].num + 1}`
            playBtn.innerHTML = 'Attack'
            playBtn.style.color = 'green'
            
            }
            displayStats(enemyStats, updatedEnemy[index])
            console.log(updatedEnemy)
            break
        case 'Await Attack':
            console.log(`${index + 1} await case `)
            msg.innerHTML = updatedEnemy[index].attack(player)
            if (player.isAlive === true){
                index++
                enemyIndex.innerHTML = `&nbsp;${enemy[index].num + 1}`
                playBtn.innerHTML = 'Attack'
                playBtn.style.color = 'green'
            }else {
                console.log('player lost')
            }
            displayStats(playerStats, player)
            console.log(updatedEnemy)
            break
    }

    if (index === updatedEnemy.length) {
        console.log('restart')
        updatedEnemy = updateEnemy(enemy)
        console.log(updatedEnemy)
        index = 0
        if (updateEnemy.length === 0) {
            console.log('player won')
        }
    }
    mgsModal.style.display = 'block'
}

/////////////////////////////////////////////////////////// 
// CLOSING
///////////////////////////////////////////////////////////

closeMsg.onclick = function () {
    msgModal.style.display = 'none'
    enemyIndex.style.display = 'block'
    // switch (playBtn.innerText) {
    //     case 'PLAY':
    //         playBtn.innerHTML = 'Attack'
    //         playBtn.style.color = 'green'
    //     case 'Attack':
    //         if(updatedEnemy[index].isAlive === true){
    //             playBtn.innerHTML = 'Await Attack'
    //             playBtn.style.color = 'red'

    //         } else {
    //             index++
    //             enemyIndex.innerHTML = `&nbsp;${enemy[index].num + 1}`
    //             playBtn.innerHTML = 'Attack'
    //             playBtn.style.color = 'green'
    //         }
    //     case 'Await Attack':
    //         enemyIndex.innerHTML = `&nbsp;${enemy[index].num + 1}` // insert +1 later
    //         playBtn.innerHTML = 'Attack'
    //         playBtn.style.color = 'green'
    // }
}

console.log(`${enemy[index].num + 1}`)

