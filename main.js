class DemoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DemoScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Pipeline WebGL: Efeito de Bloom via buffer de pixels na GPU
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

        const r = this.player.geom.radius;
        this.player.geom.x = Phaser.Math.Clamp(this.player.geom.x, r, width - r);
        this.player.geom.y = Phaser.Math.Clamp(this.player.geom.y, r, height - r);

        // Registro de posições correntes para o ciclo de renderização do Trail
        this.player.trail.push({ x: this.player.geom.x, y: this.player.geom.y });
        if (this.player.trail.length > 15) {
            this.player.trail.shift();
        }

        let currentCollision = false;

        for (let target of this.targets) {
            target.geom.x += target.vx * dt;
            target.geom.y += target.vy * dt;

            // Reflexão nos limites da resolução da câmera
            if (target.geom.x <= 0 || target.geom.x + target.geom.width >= width) target.vx *= -1;
            if (target.geom.y <= 0 || target.geom.y + target.geom.height >= height) target.vy *= -1;

            // Interseção matemática (AABB x Círculo)
            if (Phaser.Geom.Intersects.CircleToRectangle(this.player.geom, target.geom)) {
                currentCollision = true;
            }
        }

        // Alteração na matriz de projeção local (Screen Shake) em resposta à colisão
        if (currentCollision && !this.isColliding) {
            this.cameras.main.shake(150, 0.01);
        }
        this.isColliding = currentCollision;
        this.player.color = this.isColliding ? 0xf43f5e : 0x3b82f6;

        this.graphics.clear();

        // Oscilação de opacidade da grade de coordenadas usando tempo contínuo
        const gridAlpha = 0.2 + Math.sin(time / 1000) * 0.1; 
        this.graphics.lineStyle(1, 0x334155, gridAlpha);
        for (let x = 0; x < width; x += 40) this.graphics.lineBetween(x, 0, x, height);
        for (let y = 0; y < height; y += 40) this.graphics.lineBetween(0, y, width, y);

        // 
    }
}
