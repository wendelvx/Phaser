# TDE 02 - Computação Gráfica: Demonstração Phaser 3

Repositório com o código da demonstração prática desenvolvida para o seminário da disciplina de Computação Gráfica sobre o framework Phaser 3. O projeto aborda conceitos essenciais de pipeline de renderização, aceleração por hardware, transformações matemáticas e álgebra geométrica, construindo todo o aspecto visual via código em tempo real, sem dependência de imagens ou arquivos externos.

## Conceitos de Computação Gráfica Aplicados

1. Pipeline WebGL e Pós-Processamento (Shaders):
A configuração do projeto força o renderizador WebGL, garantindo a aceleração gráfica por GPU. Isso viabiliza a execução de shaders de pós-processamento (PostFX Pipeline) em tela cheia, como o efeito de Bloom, manipulando os buffers de cor e iluminação antes da rasterização final.

2. Alpha Blending e Rastro Dinâmico (Trail):
Aplicação direta de transparência e mistura de cores no canal Alpha. O rastro gerado pela movimentação da entidade principal calcula a redução progressiva da opacidade e do raio das primitivas com base no índice do vetor de histórico temporal.

3. Transformações Matemáticas Contínuas (Trigonometria):
As animações vetoriais dispensam motores de interpolação padrão. A escala pulsante dos obstáculos e a oscilação de intensidade da grade cartesiana de referência utilizam funções trigonométricas (`Math.sin`) atreladas ao relógio contínuo da cena.

4. Interseção Geométrica e Manipulação de Matriz de Câmera:
O teste de colisão utiliza cálculo analítico de interseção entre geometrias distintas (AABB versus Círculo) através do método `Phaser.Geom.Intersects.CircleToRectangle`. A detecção do impacto dispara uma perturbação instantânea na matriz de projeção da câmera principal (Screen Shake).

5. Game Loop e Delta Time:
A atualização do estado da cena ocorre dentro do método `update(time, delta)`. A velocidade linear das entidades é multiplicada pela variação temporal normalizada em segundos (`delta / 1000`), garantindo cinemática homogênea e desacoplada da taxa de atualização do monitor (FPS).

## Como Executar o Projeto

A biblioteca Phaser 3 é carregada via CDN no arquivo HTML, eliminando a necessidade de compilação ou instalação de pacotes locais.

Opção 1: Via VS Code (Live Server)
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito sobre o arquivo `index.html`.
3. Selecione a opção "Open with Live Server".
A aplicação iniciará automaticamente no navegador padrão.

Opção 2: Via Terminal (Python)
No diretório raiz do projeto, execute:
```bash
python -m http.server 8000
```
Acesse `http://localhost:8000` no navegador.

Opção 3: Via Terminal (Node.js)
No diretório raiz do projeto, execute:
```bash
npx serve .
```

## Controles

* Movimentação: Teclas W, A, S, D ou setas direcionais do teclado.
