
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

        // 
    }
    
    //
}

