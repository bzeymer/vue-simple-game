const MONSTER_DMG = 15;
const PLAYER_DMG = 10;
const PLAYER_SPECIAL = 20;
const PLAYER_HEAL = 20;

const MONSTER_DMG_COLOR = '#ff3f43';
const PLAYER_DMG_COLOR = '#2b5dff';
const PLAYER_SPECIAL_COLOR = '#ff9a2b';
const PLAYER_HEAL_COLOR = '#39f545';

new Vue({
    el: '#app',
    data: {
        gameRunning: false,
        health: {
            player: 100,
            monster: 100
        },
        log: []
    },
    methods: {
        //Public methods
        start: function() {
            this.reset();
            this.gameRunning = true;
        },
        giveUp: function() {
            this.end();
        },
        attack: function() {
            this.monsterAttack();
            this.playerAttack();
            this.checkHealth();
            this.scrollToBottom();            
        },
        special: function() {
            this.monsterAttack();
            this.playerSpecial();
            this.checkHealth();
            this.scrollToBottom();            
        },
        heal: function() {
            this.monsterAttack();
            this.playerHeal();
            this.checkHealth();
            this.scrollToBottom();
        },
        //Private methods
        monsterAttack: function() {
            var damage = Math.floor(Math.random() * MONSTER_DMG);
            if (damage === 0 ) {
                this.addToLog(`Monster attack misses you`, PLAYER_DMG_COLOR);
            } else {
                this.addToLog(`Monster attacks you for ${damage} damage`, MONSTER_DMG_COLOR);
            }
            this.health.player -= damage;
        },
        playerAttack: function() {
            var damage = Math.floor(Math.random() * PLAYER_DMG);            
            if (damage === 0 ) {
                this.addToLog(`Your attack misses the monster`, MONSTER_DMG_COLOR);
            } else {
                this.addToLog(`You attack monster for ${damage} damage`, PLAYER_DMG_COLOR);
            }
            this.health.monster -= damage;
        },
        playerSpecial: function() {
            var damage = Math.floor(Math.random() * PLAYER_SPECIAL);
            if (damage === 0 ) {
                this.addToLog(`Your special attack misses the monster`, MONSTER_DMG_COLOR);
            } else {
                this.addToLog(`You special attack monster for ${damage} damage`, PLAYER_SPECIAL_COLOR);
            }
            this.health.monster -= damage;
        },
        playerHeal: function() {
            var heal = Math.floor(Math.random() * PLAYER_HEAL);
            if (heal === 0 ) {
                this.addToLog(`Your spell fizzles`, 'black');
            } else {
                this.addToLog(`You heal yourself ${heal} damage`, PLAYER_HEAL_COLOR);
            }
            this.health.player += heal;
            if (this.health.player > 100) {
                this.health.player = 100;
            }
        },
        reset: function() {
            this.health.player = 100;
            this.health.monster = 100;
            this.log = [];
        },
        checkHealth: function() {
            let dead = [];

            if (this.health.monster <= 0) {
                this.health.monster = 0;
                dead.push("monster");
            }
            if (this.health.player <= 0) {
                this.health.player = 0;
                dead.push("player");
            }

            if (dead.length === 2) {
                this.addToLog(`It's a TIE!`, 'black');
                this.end();
            } else if (dead[0] === "monster") {
                this.addToLog(`You won! :D`, 'green');
                this.end();                
            } else if (dead[0] === "player") {
                this.addToLog(`You lost! :(`, 'red');
                this.end();                
            }
        },
        end: function() {
            this.gameRunning = false;
        },
        addToLog: function(message, color) {
            this.log.push({
                message: message,
                color: color
            });
        },
        scrollToBottom: function updateScroll(){
            setTimeout(() => {
                var element = document.getElementById("log");
                if (element) {
                    element.scrollTop = element.scrollHeight;
                }
            }, 0);
        }
    }
})