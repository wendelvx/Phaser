class DemoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DemoScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Pipeline WebGL: Efeito de Bloom Cinematográfico via buffer de pixels
        this.cameras.main.postFX.addBloom(0xffffff, 1, 1, 1.2, 1.5);

        this.player = {
            geom: new Phaser.Geom.Circle(width / 2, height / 2, 20),
            speed: 350,
            color: 0x3b82f6,
            trail: [] // Armazena histórico de posições para cálculo do Alpha Blending
        };

        this.targets = [
            { geom: new Phaser.Geom.Rectangle(150, 100, 45, 45), vx: 150, vy: 110, color: 0xef4444 },
            { geom: new Phaser.Geom.Rectangle(600, 150, 50, 50), vx: -170, vy: 130, color: 0xf97316 },
            { geom: new Phaser.Geom.Rectangle(200, 450, 40, 40), vx: 120, vy: -150, color: 0xa855f7 },
            { geom: new Phaser.Geom.Rectangle(500, 400, 45, 45), vx: -140, vy: -120, color: 0x10b981 },
            { geom: new Phaser.Geom.Rectangle(380, 250, 35, 35), vx: 160, vy: 140, color: 0xec4899 }
        ];

        // Inicialização de Contexto Gráfico, Input e HUD Técnico
        this.graphics = this.add.graphics();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');

        this.hudText = this.add.text(20, 20, '', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#e2e8f0',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            padding: { x: 15, y: 15 },
            border: '1px solid #334155'
        });

        this.isColliding = false;
    }
    
    update(time, delta) {
        // Normalização temporal em segundos
        const dt = delta / 1000;
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        let moveX = 0;
        let moveY = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) moveX -= 1;
        if (this.cursors.right.isDown || this.wasd.D.isDown) moveX += 1;
        if (this.cursors.up.isDown || this.wasd.W.isDown) moveY -= 1;
        if (this.cursors.down.isDown || this.wasd.S.isDown) moveY += 1;

        // Normalização de vetor para garantir velocidade diagonal constante
        if (moveX !== 0 && moveY !== 0) {
            moveX *= 0.7071;
            moveY *= 0.7071;
        }

        this.player.geom.x += moveX * this.player.speed * dt;
        this.player.geom.y += moveY * this.player.speed * dt;   
    }
}
