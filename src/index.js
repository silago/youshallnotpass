var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('wizard',    'assets/wizard.png');
    game.load.image('spell',    'assets/spell.png');
    game.load.image('goblin',    'assets/goblin.png');
    game.load.spritesheet('orcs', 'assets/orc_spritesheet.png', 200, 200, 4);
}


var weapon;

function create() {
    game.add.sprite(0, 0, 'background');
    orc = game.add.sprite(200, 200, 'orcs');
    walk = orc.animations.add('walk');
    orc.animations.play('walk', 30, true);

    enemies = game.add.group();
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.enable(orc, Phaser.Physics.ARCADE);


    weapon = game.add.weapon(1,'spell');
    weapon.bulletSpeed = 2000;
    weapon.fireRate = 20;
    wizard = game.add.sprite(0, 0, 'wizard');
    wizard.can_cast = true;
    graphics = game.add.graphics(100, 100);
    //game.physics.enable(wizard, Phaser.Physics.ARCADE);
}

function collisionHandler() {
    orc.kill();
    bullet.kill();
}

function update() {
    if (game.input.mousePointer.isDown && wizard.can_cast) {
        wizard.can_cast = false;
        //weapon.fire(wizard,game.input.x,game.input.y);
        bullet = bullets.create(0,0,'spell');
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        game.physics.arcade.velocityFromAngle(bullet.angle, 300, bullet.body.velocity);
        //game.physics.moveToPointer(wizard, 400);
        //console.log('mouse pressed');
        //console.log("all pos",game.input.x, game.input.y)
        //graphics.lineStyle(2, 0x33FF00);
        //graphics.moveTo(220,220);
        //graphics.lineTo(game.input.mousePointer.x, game.input.mousePointer.y);
    } else {
        wizard.can_cast = true;
    }
    game.physics.arcade.overlap(bullets, orc, collisionHandler, null, this);
}

