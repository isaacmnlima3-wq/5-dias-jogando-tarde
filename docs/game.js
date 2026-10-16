/**
 * ===================================================================
 * 5 DIAS JOGANDO TARDE - JOGO PRINCIPAL
 * HTML5 / CSS3 / JavaScript Puro
 * ===================================================================
 */

// ===================================================================
// CONFIGURAÇÕES E CAMINHOS DE ARQUIVOS
// ===================================================================
const CONFIG = {
  // Caminhos das imagens do Escritório
  OFFICE: {
    DOOR_OPEN: '../cenario-quarto-principal/imagens/porta-aberta.jpg',
    DOOR_CLOSED: '../cenario-quarto-principal/imagens/porta-fechada.jpg',
  },

  // Caminhos das Câmeras de Vigilância
  CAMERAS: {
    cam1: {
      id: 'cam1',
      name: '[CAM 1] - SALA PRINCIPAL',
      src: '../cenario-sala/fotos/cenario-sala.jpg'
    },
    cam2: {
      id: 'cam2',
      name: '[CAM 2] - CORREDOR',
      src: '../cenario-corredor/fotos/cenario-corredor.jpg'
    },
    cam3: {
      id: 'cam3',
      name: '[CAM 3] - COZINHA',
      src: '../cozinha/cenario-cozinha.jpg'
    },
    cam4: {
      id: 'cam4',
      name: '[CAM 4] - QUARTO DOS PAIS',
      src: encodeURI('../cenario-quarto-dos-pais/cenario-quarto-dos pais.jpg')
    }
  },

  // Efeitos de som sintetizados (Web Audio API)
  AUDIO: {
    ENABLED: true
  },

  // Configuração do Tempo e Duração da Noite
  TIME: {
    HOUR_DURATION_SECONDS: 120, // Cada hora dura 2 minutos (120 segundos)
    TOTAL_HOURS: 6,             // 12:00 AM até 6:00 AM (Vitória ao atingir 6:00 AM)
  },

  // Configuração do Sistema de Ansiedade e Modo Assistir
  ANXIETY: {
    INITIAL: 0,
    MAX: 100,
    DRAIN_WATCHING_PER_SEC: 3,  // Cada segundo assistindo reduz -3%
    GAIN_DEFAULT_PER_SEC: 1,    // Cada segundo sem assistir aumenta +1%
    INTERVAL_MS: 1000,
    YOUTUBE_URL: "https://www.youtube.com/embed/OIJBDKpX2wA?si=QOLT-M3_iTB5hXzb&autoplay=1&enablejsapi=1"
  },

  // Personagens do Jogo
  CHARACTERS: {
    pai: {
      id: 'pai',
      name: 'Pai',
      src: '../personagens/pai/InShot_20261015_193322516.png'
    },
    mae: {
      id: 'mae',
      name: 'Mãe',
      src: '../personagens/mãe/InShot_20261015_200557116.png'
    },
    irmao: {
      id: 'irmao',
      name: 'Irmão Mais Novo',
      src: '../personagens/irmão%20mais%20novo/InShot_20261015_192531594.png'
    }
  },

  // Coordenadas Calibradas para Posicionamento dos Personagens
  POSITIONS: {
    // 🚪 NA PORTA DO ESCRITÓRIO (Visão do Jogador com a Porta Aberta)
    door: {
      name: 'Porta Aberta (Escritório)',
      atDoor: { x: 43.4, y: 99.6, height: 92.5, brightness: 90 },       // Posição base (Pai)
      atDoor_irmao: { x: 42.9, y: 99.3, height: 54.0, brightness: 90 }, // Irmão Mais Novo no chão da porta
      atDoor_pai: { x: 43.4, y: 99.6, height: 92.5, brightness: 90 },   // Pai no vão da porta com cinto
      atDoor_mae: { x: 43.7, y: 98.8, height: 100.0, brightness: 90 },  // Mãe ocupando toda a altura do vão
      peeking: { x: 53.0, y: 86.0, height: 72.0, brightness: 85 },      // Espreitando na beirada da porta
      hallwayBack: { x: 43.0, y: 78.0, height: 48.0, brightness: 70 },  // Mais ao fundo do corredor
      jumpscare: { x: 43.0, y: 98.0, height: 96.0, brightness: 110 }    // Na cara do jogador
    },

    // 🛋️ [CAM 1] - SALA PRINCIPAL
    cam1: {
      name: 'CAM 1: Sala Principal',
      center: { x: 49.5, y: 74.0, height: 56.0, brightness: 80 },      // No meio da sala (tapete)
      doorBack: { x: 49.0, y: 49.0, height: 28.0, brightness: 65 },    // Na porta escura ao fundo
      couch: { x: 30.0, y: 80.0, height: 62.0, brightness: 75 },       // Perto do sofá (esquerda)
      foreground: { x: 48.0, y: 92.0, height: 84.0, brightness: 85 }   // Perto da câmera
    },

    // 🚪 [CAM 2] - CORREDOR
    cam2: {
      name: 'CAM 2: Corredor',
      far: { x: 50.0, y: 47.0, height: 22.0, brightness: 60 },         // Fundo escuro do corredor
      mid: { x: 50.0, y: 66.0, height: 42.0, brightness: 75 },         // Meio do corredor
      close: { x: 50.0, y: 92.0, height: 82.0, brightness: 90 },       // Próximo à câmera (saindo do corredor)
      leftDoor: { x: 41.4, y: 88.0, height: 62.0, brightness: 90 },   // Porta esquerda / perigo iminente perto do escritório
      rightDoor: { x: 63.5, y: 75.0, height: 55.0, brightness: 70 }   // Saindo da porta lateral direita
    },

    // 🍳 [CAM 3] - COZINHA
    cam3: {
      name: 'CAM 3: Cozinha',
      floorFront: { x: 31.8, y: 99.6, height: 58.0, brightness: 80 },  // Perto do chão/balcão (pés firmes no piso sem voar)
      tableCenter: { x: 52.0, y: 84.0, height: 58.0, brightness: 80 }, // No centro, perto da mesa
      doorDark: { x: 86.0, y: 74.0, height: 46.0, brightness: 65 },    // Na porta escura dos fundos (à direita)
      fridge: { x: 62.0, y: 63.0, height: 38.0, brightness: 75 },      // Ao lado da geladeira
      sink: { x: 30.0, y: 72.0, height: 48.0, brightness: 70 }         // Perto da pia e armários (à esquerda)
    },

    // 🛏️ [CAM 4] - QUARTO DOS PAIS
    cam4: {
      name: 'CAM 4: Quarto dos Pais',
      bedFoot: { x: 53.0, y: 84.0, height: 58.0, brightness: 80 },     // No pé da cama
      bedLeft: { x: 38.0, y: 68.0, height: 44.0, brightness: 75 },     // Ao lado esquerdo da cama (armário)
      bedRight: { x: 70.0, y: 72.0, height: 44.0, brightness: 75 },    // Ao lado direito da cama (criado-mudo)
      windowChair: { x: 82.0, y: 78.0, height: 52.0, brightness: 70 }, // Perto da cadeira e janela
      mirror: { x: 17.5, y: 62.0, height: 36.0, brightness: 70 }       // No reflexo do espelho da cômoda
    }
  },

  // Rotas de Movimentação dos Personagens (Caminho gradual até a Porta)
  AI_ROUTES: {
    // PAI: Começa no Quarto dos Pais (CAM 4), vai pra Sala (CAM 1), Corredor esquerdo (CAM 2) e Porta
    pai: [
      { location: 'cam4', positionKey: 'bedFoot' },
      { location: 'cam4', positionKey: 'bedLeft' },
      { location: 'cam1', positionKey: 'doorBack' },
      { location: 'cam1', positionKey: 'center' },
      { location: 'cam2', positionKey: 'mid' },
      { location: 'cam2', positionKey: 'leftDoor' },
      { location: 'door', positionKey: 'atDoor_pai' }
    ],
    // MÃE: Começa na Cozinha com pés no chão (CAM 3), vai pra Sala (CAM 1), Corredor esquerdo (CAM 2) e Porta
    mae: [
      { location: 'cam3', positionKey: 'floorFront' },
      { location: 'cam3', positionKey: 'doorDark' },
      { location: 'cam1', positionKey: 'couch' },
      { location: 'cam2', positionKey: 'mid' },
      { location: 'cam2', positionKey: 'leftDoor' },
      { location: 'door', positionKey: 'atDoor_mae' }
    ],
    // IRMÃO MAIS NOVO: Começa na Sala (CAM 1), avança rápido pelo Corredor esquerdo (CAM 2) e Porta
    irmao: [
      { location: 'cam1', positionKey: 'doorBack' },
      { location: 'cam1', positionKey: 'center' },
      { location: 'cam1', positionKey: 'foreground' },
      { location: 'cam2', positionKey: 'mid' },
      { location: 'cam2', positionKey: 'leftDoor' },
      { location: 'door', positionKey: 'atDoor_irmao' }
    ]
  },

  // Configuração da Inteligência Artificial por Noite
  AI_CONFIG: {
    TICK_INTERVAL_MS: 4500, // Intervalo de oportunidade de movimento (4.5 segundos estilo FNAF)
    DOOR_ATTACK_TICKS: 2,   // Ticks esperando na porta antes de bater e recuar se estiver fechada
    NIGHT_LEVELS: {
      1: { pai: 1, mae: 2, irmao: 3 },
      2: { pai: 3, mae: 4, irmao: 5 },
      3: { pai: 5, mae: 6, irmao: 8 },
      4: { pai: 8, mae: 9, irmao: 11 },
      5: { pai: 12, mae: 13, irmao: 15 }
    }
  }
};

// ===================================================================
// ESTADO DO JOGO
// ===================================================================
const GameState = {
  started: false,
  doorClosed: false,       // false = aberta, true = fechada
  monitorUp: false,        // false = abaixado (no escritório), true = câmeras ativas
  isWatching: false,       // true quando está assistindo ao vídeo na TV
  isTransitioning: false,  // true durante a execução do vídeo de abrir/fechar
  currentCamera: 'cam1',   // câmera ativa padrão
  currentHour: 0,          // 0 = 12 AM, 1 = 1 AM, ..., 6 = 6 AM (Vitória)
  currentNight: 1,         // Noite atual (carregada do save ou iniciada em 1)
  hasWon: false,           // true quando chega às 6:00 AM
  isGameOver: false,       // true quando a noite é perdida
  anxiety: 0,              // 0% até 100% (Game Over aos 100%)
  clockTimer: null,        // Referência do setInterval do relógio
  anxietyTimer: null,      // Referência do setInterval da ansiedade
  autoResetTimer: null,    // Referência do intervalo de contagem regressiva para reset
  menuStaticInterval: null,// Intervalo do ruído do menu
  menuGlitchInterval: null // Temporizador de glitches dos personagens no menu
};

// ===================================================================
// ELEMENTOS DO DOM
// ===================================================================
const DOM = {
  // Menu Principal
  mainMenu: document.getElementById('main-menu'),
  btnNewGame: document.getElementById('btn-new-game'),
  btnContinueGame: document.getElementById('btn-continue-game'),
  menuContinueTag: document.getElementById('menu-continue-tag'),
  btnShowControls: document.getElementById('btn-show-controls'),
  controlsModal: document.getElementById('controls-modal'),
  btnCloseControls: document.getElementById('btn-close-controls'),
  menuStaticCanvas: document.getElementById('menu-static-canvas'),
  menuCharacters: document.getElementById('menu-characters'),
  btnReturnMenu: document.getElementById('btn-return-menu'),

  // Telas do Jogo
  officeScene: document.getElementById('office-scene'),
  cameraSystem: document.getElementById('camera-system'),
  watchSystem: document.getElementById('watch-system'),
  winScreen: document.getElementById('win-screen'),
  winNightTitle: document.getElementById('win-night-title'),
  btnWinRestart: document.getElementById('btn-win-restart'),
  btnWinMenu: document.getElementById('btn-win-menu'),
  winCountdown: document.getElementById('win-countdown'),
  gameoverScreen: document.getElementById('gameover-screen'),
  btnGameoverRestart: document.getElementById('btn-gameover-restart'),
  btnGameoverMenu: document.getElementById('btn-gameover-menu'),
  gameoverCountdown: document.getElementById('gameover-countdown'),
  gameoverHourReached: document.getElementById('gameover-hour-reached'),
  gameoverSubtitle: document.getElementById('gameover-subtitle'),
  gameoverDesc: document.getElementById('gameover-desc'),

  // Porta
  bgDoorOpen: document.getElementById('bg-door-open'),
  bgDoorClosed: document.getElementById('bg-door-closed'),
  btnToggleDoor: document.getElementById('btn-toggle-door'),
  doorStatusText: document.getElementById('door-status-text'),

  // Assistir (TV / Anti-Ansiedade)
  watchPanel: document.getElementById('watch-panel'),
  btnToggleWatch: document.getElementById('btn-toggle-watch'),
  watchEdgeTab: document.getElementById('watch-edge-tab'),
  watchStatusText: document.getElementById('watch-status-text'),
  btnExitWatch: document.getElementById('btn-exit-watch'),
  videoWatchOpen: document.getElementById('video-watch-open'),
  videoWatchClose: document.getElementById('video-watch-close'),
  watchYoutubeIframe: document.getElementById('watch-youtube-iframe'),

  // HUD e Efeitos de Ansiedade
  anxietyHud: document.getElementById('anxiety-hud'),
  anxietyPercentage: document.getElementById('anxiety-percentage'),
  anxietyMeterFill: document.getElementById('anxiety-meter-fill'),
  anxietyStatusTag: document.getElementById('anxiety-status-tag'),
  anxietyVignette: document.getElementById('anxiety-vignette'),

  // Monitor e Vídeos
  videoMonitorOpen: document.getElementById('video-monitor-open'),
  videoMonitorClose: document.getElementById('video-monitor-close'),
  flipMonitorBar: document.getElementById('flip-monitor-bar'),

  // Câmeras
  cameraFeedImg: document.getElementById('camera-feed-img'),
  cameraNameDisplay: document.getElementById('camera-name-display'),
  camButtons: document.querySelectorAll('.cam-map-btn'),
  staticCanvas: document.getElementById('camera-static-canvas'),
  
  // Camadas de Personagens (para implementação futura)
  officeCharacterLayer: document.getElementById('office-character-layer'),
  cameraCharacterLayer: document.getElementById('camera-character-layer'),
};

// ===================================================================
// MOTOR DE ÁUDIO PROCEDURAL (Sem depender de arquivos externos)
// ===================================================================
const SoundFX = {
  ctx: null,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  // Efeito sonoro de hover nas opções do menu estilo FNAF
  playMenuHover() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  },

  // Efeito sonoro de clique / seleção no menu (estática e impacto tenso)
  playMenuSelect() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Rajada de estática
    const bufferSize = this.ctx.sampleRate * 0.22;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.35;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);

    // Impacto grave tenso
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    oscGain.gain.setValueAtTime(0.25, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  },

  // Som mecânico/pneumático da porta
  playDoor(isClosing) {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Ruído branco (som de ar comprimido / deslizamento pesado)
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = isClosing ? 'lowpass' : 'bandpass';
    filter.frequency.setValueAtTime(isClosing ? 350 : 600, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    // Impacto metálico no final
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isClosing ? 80 : 120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

    oscGain.gain.setValueAtTime(0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  },

  // Bip de troca de câmera / estática
  playCameraSwitch() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Bip eletrônico agudo
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // Breve rajada de estática
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
  },

  // Clique/Notificação discreta ao mudar de hora
  playHourTick() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  },

  // Carrilhão clássico de 6:00 AM (Vitória) com sinos e acorde festivo
  playChime6AM() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Sequência de notas do sino (Dó5, Mi5, Sol5, Dó6, Sol5, Dó6)
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    const delays = [0, 0.35, 0.70, 1.05, 1.50, 2.00];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delays[idx]);

      gain.gain.setValueAtTime(0, now + delays[idx]);
      gain.gain.linearRampToValueAtTime(0.28, now + delays[idx] + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delays[idx] + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delays[idx]);
      osc.stop(now + delays[idx] + 1.25);
    });

    // Acorde final de celebração triunfante às 2.3s
    setTimeout(() => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach(f => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(t);
        o.stop(t + 2.0);
      });
    }, 2300);
  },

  // Efeito sonoro de apagão / queda brusca de energia (Blackout)
  playPowerDown() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Zumbido de transformador elétrico desacelerando e morrendo
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(15, now + 1.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.45);

    // Relé eletromagnético desarmando (estalo metálico pesado)
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(60, now);
    clickGain.gain.setValueAtTime(0.45, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.18);
  },

  // Efeito sonoro de batimento cardíaco (Ansiedade alta / Taquicardia)
  playHeartbeat(anxietyLevel = 80) {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freq = 55 + Math.min(25, (anxietyLevel - 70));

    // Primeiro batimento (Tum)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc1.frequency.exponentialRampToValueAtTime(25, now + 0.12);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.13);

    // Segundo batimento suave (tum)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq - 6, now + 0.16);
    osc2.frequency.exponentialRampToValueAtTime(20, now + 0.28);
    gain2.gain.setValueAtTime(0.2, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.29);
  },

  // Efeito sonoro de passos / movimentação na casa
  playFootsteps() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.28].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now + delay);
      osc.frequency.exponentialRampToValueAtTime(30, now + delay + 0.12);
      gain.gain.setValueAtTime(0.18, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.13);
    });
  },

  // Efeito sonoro de batidas na porta fechada (bloqueio do personagem)
  playDoorKnock() {
    if (!CONFIG.AUDIO.ENABLED || !this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.18, 0.36].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now + delay);
      osc.frequency.exponentialRampToValueAtTime(35, now + delay + 0.1);
      gain.gain.setValueAtTime(0.38, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.11);
    });
  }
};

// ===================================================================
// SISTEMA DA PORTA DO ESCRITÓRIO
// ===================================================================
function toggleDoor() {
  if (!GameState.started || GameState.monitorUp || GameState.isWatching || GameState.isTransitioning || GameState.isGameOver || GameState.hasWon) return;

  GameState.doorClosed = !GameState.doorClosed;

  if (GameState.doorClosed) {
    // Porta Fechada
    DOM.bgDoorOpen.classList.remove('active');
    DOM.bgDoorClosed.classList.add('active');

    DOM.btnToggleDoor.classList.remove('open');
    DOM.btnToggleDoor.classList.add('closed');
    DOM.doorStatusText.textContent = 'FECHADA';
  } else {
    // Porta Aberta
    DOM.bgDoorClosed.classList.remove('active');
    DOM.bgDoorOpen.classList.add('active');

    DOM.btnToggleDoor.classList.remove('closed');
    DOM.btnToggleDoor.classList.add('open');
    DOM.doorStatusText.textContent = 'ABERTA';
  }

  SoundFX.playDoor(GameState.doorClosed);

  // Se a porta acabou de fechar, avisa a IA dos personagens
  if (GameState.doorClosed && typeof CharacterSystem !== 'undefined') {
    CharacterSystem.onDoorClosed();
  }
}

// ===================================================================
// SISTEMA DE CÂMERAS E MONITOR (TABLET)
// ===================================================================

// Alternar entre abrir e fechar o monitor
function toggleMonitor() {
  if (!GameState.started || GameState.isTransitioning || GameState.isGameOver || GameState.hasWon) return;

  if (GameState.monitorUp) {
    closeMonitor();
  } else {
    // Se estiver assistindo TV, fecha a TV primeiro
    if (GameState.isWatching) {
      closeWatch();
    }
    openMonitor();
  }
}

// Abrir monitor com vídeo de transição
function openMonitor() {
  GameState.isTransitioning = true;
  DOM.flipMonitorBar.classList.add('monitor-up');

  // Prepara e toca o vídeo de abertura
  const video = DOM.videoMonitorOpen;
  video.style.display = 'block';
  video.currentTime = 0;

  const onEnded = () => {
    video.removeEventListener('ended', onEnded);
    video.style.display = 'none';

    // Ativa a tela de câmeras
    DOM.officeScene.classList.remove('active');
    DOM.cameraSystem.classList.add('active');
    GameState.monitorUp = true;
    GameState.isTransitioning = false;

    // Atualiza a visão da câmera atual
    setCamera(GameState.currentCamera, true);
  };

  video.addEventListener('ended', onEnded);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Caso haja bloqueio de autoplay no browser, abre direto com segurança
      onEnded();
    });
  }
}

// Fechar monitor com vídeo de transição reversa
function closeMonitor() {
  GameState.isTransitioning = true;
  DOM.flipMonitorBar.classList.remove('monitor-up');

  // Oculta a cena de câmeras imediatamente
  DOM.cameraSystem.classList.remove('active');

  // Prepara e toca o vídeo reverso
  const video = DOM.videoMonitorClose;
  video.style.display = 'block';
  video.currentTime = 0;

  const onEnded = () => {
    video.removeEventListener('ended', onEnded);
    video.style.display = 'none';

    // Retorna à visão do escritório
    DOM.officeScene.classList.add('active');
    GameState.monitorUp = false;
    GameState.isTransitioning = false;
  };

  video.addEventListener('ended', onEnded);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      onEnded();
    });
  }
}

// ===================================================================
// SISTEMA DE ASSISTIR (TV / VÍDEO RELAXANTE ANTI-ANSIEDADE)
// ===================================================================

function toggleWatch() {
  if (!GameState.started || GameState.isTransitioning || GameState.isGameOver || GameState.hasWon) return;

  if (GameState.isWatching) {
    closeWatch();
  } else {
    // Se o monitor estiver levantado, fecha ele primeiro
    if (GameState.monitorUp) {
      closeMonitor();
    }
    openWatch();
  }
}

// Abrir modo assistir (toca vídeo de transição e depois ativa o player do YouTube)
function openWatch() {
  if (GameState.isWatching || GameState.isTransitioning) return;
  GameState.isTransitioning = true;

  const video = DOM.videoWatchOpen;
  if (!video) {
    onWatchOpened();
    return;
  }

  video.style.display = 'block';
  video.currentTime = 0;

  const onEnded = () => {
    video.removeEventListener('ended', onEnded);
    video.style.display = 'none';
    onWatchOpened();
  };

  function onWatchOpened() {
    DOM.officeScene.classList.remove('active');
    DOM.watchSystem.classList.add('active');
    GameState.isWatching = true;
    GameState.isTransitioning = false;

    // Inicia o vídeo do YouTube com autoplay
    if (DOM.watchYoutubeIframe) {
      DOM.watchYoutubeIframe.src = CONFIG.ANXIETY.YOUTUBE_URL;
    }
    updateAnxietyDisplays();
  }

  video.addEventListener('ended', onEnded);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      onEnded();
    });
  }
}

// Fechar modo assistir (pausa o YouTube e toca vídeo de volta ao escritório)
function closeWatch() {
  if (!GameState.isWatching || GameState.isTransitioning) return;
  GameState.isTransitioning = true;

  // Interrompe o áudio/vídeo do YouTube imediatamente
  if (DOM.watchYoutubeIframe) {
    DOM.watchYoutubeIframe.src = '';
  }

  DOM.watchSystem.classList.remove('active');

  const video = DOM.videoWatchClose;
  if (!video) {
    onWatchClosed();
    return;
  }

  video.style.display = 'block';
  video.currentTime = 0;

  const onEnded = () => {
    video.removeEventListener('ended', onEnded);
    video.style.display = 'none';
    onWatchClosed();
  };

  function onWatchClosed() {
    DOM.officeScene.classList.add('active');
    GameState.isWatching = false;
    GameState.isTransitioning = false;
    updateAnxietyDisplays();
  }

  video.addEventListener('ended', onEnded);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      onEnded();
    });
  }
}

// Trocar de Câmera (CAM 1 a CAM 4)
function setCamera(camId, force = false) {
  if (!CONFIG.CAMERAS[camId]) return;
  if (GameState.currentCamera === camId && !force) return;

  GameState.currentCamera = camId;
  const camData = CONFIG.CAMERAS[camId];

  // Efeito sonoro de comutação
  SoundFX.playCameraSwitch();

  // Atualiza imagem e HUD
  DOM.cameraFeedImg.src = camData.src;
  DOM.cameraNameDisplay.textContent = camData.name;

  // Atualiza os botões ativos no mapa
  DOM.camButtons.forEach(btn => {
    if (btn.dataset.cam === camId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Pulso de estática na troca
  triggerStaticBurst();

  // Renderiza personagens na câmera ativa
  if (typeof CharacterSystem !== 'undefined') {
    CharacterSystem.renderActiveCamera();
  }
}

// ===================================================================
// RUÍDO ESTÁTICO DE SEGURANÇA (CANVAS PROCEDURAL)
// ===================================================================
let staticAnimationId = null;
let staticIntensity = 0.18;

function initStaticCanvas() {
  const canvas = DOM.staticCanvas;
  const ctx = canvas.getContext('2d');
  
  // Resolução reduzida para alta performance
  const w = 320;
  const h = 180;
  canvas.width = w;
  canvas.height = h;

  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  function renderNoise() {
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;     // R
      data[i + 1] = v; // G
      data[i + 2] = v; // B
      data[i + 3] = 255; // Alpha
    }
    ctx.putImageData(imgData, 0, 0);

    if (GameState.monitorUp) {
      staticAnimationId = requestAnimationFrame(renderNoise);
    }
  }

  renderNoise();
}

// Dispara uma piscada mais forte de estática na comutação
function triggerStaticBurst() {
  const canvas = DOM.staticCanvas;
  canvas.style.opacity = '0.7';
  setTimeout(() => {
    canvas.style.opacity = '0.18';
  }, 120);
}

// ===================================================================
// SISTEMA DE RELÓGIO E CONDIÇÃO DE VITÓRIA (12:00 AM - 6:00 AM)
// ===================================================================
function formatHour(hourIndex) {
  if (hourIndex === 0) return '12:00 AM';
  return `${hourIndex}:00 AM`;
}

function updateClockDisplays() {
  const timeStr = formatHour(GameState.currentHour);
  document.querySelectorAll('.hud-clock').forEach(el => {
    el.textContent = timeStr;
  });
}

function startNightTimer() {
  if (GameState.clockTimer) clearInterval(GameState.clockTimer);

  GameState.currentHour = 0;
  GameState.hasWon = false;
  updateClockDisplays();

  const intervalMs = CONFIG.TIME.HOUR_DURATION_SECONDS * 1000;

  GameState.clockTimer = setInterval(() => {
    if (!GameState.started || GameState.hasWon) return;

    GameState.currentHour++;
    updateClockDisplays();
    SoundFX.playHourTick();

    if (GameState.currentHour >= CONFIG.TIME.TOTAL_HOURS) {
      triggerWin();
    }
  }, intervalMs);
}

function triggerWin() {
  GameState.hasWon = true;
  if (GameState.clockTimer) clearInterval(GameState.clockTimer);
  if (GameState.anxietyTimer) clearInterval(GameState.anxietyTimer);

  // Se o modo assistir estiver aberto, fecha imediatamente
  if (GameState.isWatching) {
    if (DOM.watchYoutubeIframe) DOM.watchYoutubeIframe.src = '';
    DOM.watchSystem.classList.remove('active');
    DOM.officeScene.classList.add('active');
    GameState.isWatching = false;
  }

  // Se o monitor de câmeras estiver aberto, fecha imediatamente
  if (GameState.monitorUp) {
    DOM.cameraSystem.classList.remove('active');
    DOM.officeScene.classList.add('active');
    DOM.flipMonitorBar.classList.remove('monitor-up');
    GameState.monitorUp = false;
  }

  // Interrompe IA dos personagens
  if (typeof CharacterSystem !== 'undefined') {
    CharacterSystem.stopAiLoop();
  }

  // Toca os sinos e acorde de vitória de 6:00 AM
  SoundFX.playChime6AM();

  // Reinicia animação do relógio (5 rolando para 6)
  const hourContainer = document.querySelector('.hour-container');
  if (hourContainer) {
    hourContainer.style.animation = 'none';
    hourContainer.offsetHeight; // Força recálculo de estilo (reflow)
    hourContainer.style.animation = 'rollHour 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards';
  }

  // ==========================================
  // CONDIÇÃO ESPECIAL: NOITE 5 (ZEROU O JOGO!)
  // ==========================================
  if (GameState.currentNight >= 5) {
    // Mantém o progresso na Noite 5 para poder jogar a Noite 5 de novo
    saveNight(5);
    try {
      localStorage.setItem('fnaf_familias_beaten', 'true');
    } catch (e) {}

    refreshContinueButton();

    if (DOM.winNightTitle) {
      DOM.winNightTitle.textContent = `NOITE 5 CONCLUÍDA - VOCÊ SOBREVIVEU!`;
    }

    // Na Noite 5 esconde o botão de próxima noite
    if (DOM.btnWinRestart) {
      DOM.btnWinRestart.style.display = 'none';
    }

    const autoResetHint = document.querySelector('.win-restart-box .auto-reset-hint');
    let timeLeft = 4;
    if (autoResetHint) {
      autoResetHint.innerHTML = `Retornando ao Menu Principal em <span id="win-countdown">${timeLeft}</span>s...`;
    }

    DOM.winScreen.classList.add('active');

    if (GameState.autoResetTimer) clearInterval(GameState.autoResetTimer);
    GameState.autoResetTimer = setInterval(() => {
      timeLeft--;
      const countdownEl = document.getElementById('win-countdown');
      if (countdownEl) countdownEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(GameState.autoResetTimer);
        // Vai direto para o menu principal!
        returnToMainMenu();
      }
    }, 1000);

    return;
  }

  // ==========================================
  // NOITES 1 A 4: PROGRESSÃO NORMAL
  // ==========================================
  if (DOM.btnWinRestart) {
    DOM.btnWinRestart.style.display = 'block';
  }

  if (DOM.winNightTitle) {
    DOM.winNightTitle.textContent = `NOITE ${GameState.currentNight} CONCLUÍDA`;
  }

  // Avança para a próxima noite e salva no LocalStorage
  GameState.currentNight++;
  saveNight(GameState.currentNight);
  updateNightDisplays();
  refreshContinueButton();

  if (DOM.btnWinRestart) {
    DOM.btnWinRestart.textContent = `PRÓXIMA NOITE (NOITE ${GameState.currentNight})`;
  }

  const autoResetHint = document.querySelector('.win-restart-box .auto-reset-hint');
  let timeLeft = 8;
  if (autoResetHint) {
    autoResetHint.innerHTML = `Continuando em <span id="win-countdown">${timeLeft}</span>s...`;
  }

  DOM.winScreen.classList.add('active');

  if (GameState.autoResetTimer) clearInterval(GameState.autoResetTimer);
  GameState.autoResetTimer = setInterval(() => {
    timeLeft--;
    const countdownEl = document.getElementById('win-countdown');
    if (countdownEl) countdownEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(GameState.autoResetTimer);
      resetGame();
    }
  }, 1000);
}

// ==============================================
// SISTEMA DE ANSIEDADE E TENSÃO (ANTI-ANSIEDADE)
// ==============================================

function updateAnxietyDisplays() {
  const anxietyVal = Math.round(Math.min(100, Math.max(0, GameState.anxiety)));

  if (DOM.anxietyPercentage) {
    DOM.anxietyPercentage.textContent = anxietyVal;
  }

  if (DOM.anxietyMeterFill) {
    DOM.anxietyMeterFill.style.width = `${anxietyVal}%`;
  }

  // Tags e Classes do HUD de Ansiedade
  if (DOM.anxietyHud) {
    DOM.anxietyHud.classList.remove('calm', 'tense', 'panic');

    if (anxietyVal < 40) {
      DOM.anxietyHud.classList.add('calm');
    } else if (anxietyVal < 70) {
      DOM.anxietyHud.classList.add('tense');
    } else {
      DOM.anxietyHud.classList.add('panic');
    }
  }

  if (DOM.anxietyStatusTag) {
    if (GameState.isWatching) {
      DOM.anxietyStatusTag.textContent = 'RELAXANDO (-3%/s)';
    } else if (anxietyVal < 40) {
      DOM.anxietyStatusTag.textContent = 'CALMO (+1%/s)';
    } else if (anxietyVal < 70) {
      DOM.anxietyStatusTag.textContent = 'INQUIETO (+1%/s)';
    } else if (anxietyVal < 90) {
      DOM.anxietyStatusTag.textContent = 'MUITO ANSIOSO (+1%/s)';
    } else {
      DOM.anxietyStatusTag.textContent = 'PÂNICO IMINENTE! (+1%/s)';
    }
  }

  // Vinheta visual na tela
  if (DOM.anxietyVignette) {
    DOM.anxietyVignette.classList.remove('active-warning', 'active-critical');
    if (anxietyVal >= 90) {
      DOM.anxietyVignette.classList.add('active-critical');
    } else if (anxietyVal >= 70) {
      DOM.anxietyVignette.classList.add('active-warning');
    }
  }
}

function startAnxietyTimer() {
  if (GameState.anxietyTimer) clearInterval(GameState.anxietyTimer);

  updateAnxietyDisplays();

  GameState.anxietyTimer = setInterval(() => {
    if (!GameState.started || GameState.hasWon || GameState.isGameOver) return;

    if (GameState.isWatching) {
      // Cada segundo assistindo reduz -3%
      GameState.anxiety = Math.max(0, GameState.anxiety - CONFIG.ANXIETY.DRAIN_WATCHING_PER_SEC);
    } else {
      // Fazendo nada ou nas câmeras: cada segundo aumenta +1%
      GameState.anxiety = Math.min(100, GameState.anxiety + CONFIG.ANXIETY.GAIN_DEFAULT_PER_SEC);
    }

    updateAnxietyDisplays();

    // Tensão alta: som de taquicardia/batimento cardíaco quando não está assistindo
    if (GameState.anxiety >= 70 && !GameState.isWatching) {
      SoundFX.playHeartbeat(GameState.anxiety);
    }

    // Quando chega a 100%: Game Over imediato!
    if (GameState.anxiety >= 100) {
      triggerGameOver('ATAQUE DE ANSIEDADE');
    }
  }, CONFIG.ANXIETY.INTERVAL_MS);
}

// Atalho de teste rápido para adicionar/remover ansiedade
function cheatAddAnxiety(amount = 10) {
  if (!GameState.started || GameState.hasWon || GameState.isGameOver) return;
  GameState.anxiety = Math.min(100, Math.max(0, GameState.anxiety + amount));
  updateAnxietyDisplays();
  SoundFX.playHourTick();

  if (GameState.anxiety >= 100) {
    triggerGameOver('ATAQUE DE ANSIEDADE');
  }
}

// ==============================================
// SISTEMA DE DERROTA / GAME OVER
// ==============================================

// Dispara Game Over
function triggerGameOver(reason = 'Você foi pego!') {
  if (GameState.isGameOver || GameState.hasWon) return;
  GameState.isGameOver = true;

  // Interrompe temporizadores
  if (GameState.clockTimer) clearInterval(GameState.clockTimer);
  if (GameState.anxietyTimer) clearInterval(GameState.anxietyTimer);
  if (typeof CharacterSystem !== 'undefined') CharacterSystem.stopAiLoop();

  // Se estava assistindo, fecha a TV e interrompe o som do YouTube
  if (GameState.isWatching) {
    if (DOM.watchYoutubeIframe) DOM.watchYoutubeIframe.src = '';
    DOM.watchSystem.classList.remove('active');
    GameState.isWatching = false;
  }

  // Fecha imediatamente o monitor se estiver aberto
  if (GameState.monitorUp) {
    DOM.cameraSystem.classList.remove('active');
    DOM.officeScene.classList.add('active');
    DOM.flipMonitorBar.classList.remove('monitor-up');
    GameState.monitorUp = false;
  }

  // Configura textos específicos da derrota
  if (reason === 'ATAQUE DE ANSIEDADE') {
    if (DOM.gameoverSubtitle) DOM.gameoverSubtitle.textContent = 'ATAQUE DE ANSIEDADE (100%)';
    if (DOM.gameoverDesc) DOM.gameoverDesc.textContent = 'Sua ansiedade chegou ao limite máximo. Você perdeu o controle da respiração e o pânico tomou conta!';
  } else {
    if (DOM.gameoverSubtitle) DOM.gameoverSubtitle.textContent = 'VOCÊ FOI PEGO';
    if (DOM.gameoverDesc) DOM.gameoverDesc.textContent = 'Você não sobreviveu à noite...';
  }

  // Registra o horário que o jogador alcançou
  if (DOM.gameoverHourReached) {
    DOM.gameoverHourReached.textContent = formatHour(GameState.currentHour);
  }

  if (DOM.btnGameoverRestart) {
    DOM.btnGameoverRestart.textContent = `TENTAR NOVAMENTE (NOITE ${GameState.currentNight})`;
  }

  // Exibe tela de Game Over
  DOM.gameoverScreen.classList.add('active');

  // Contagem regressiva para auto-reset
  let timeLeft = 8;
  if (DOM.gameoverCountdown) DOM.gameoverCountdown.textContent = timeLeft;
  if (GameState.autoResetTimer) clearInterval(GameState.autoResetTimer);

  GameState.autoResetTimer = setInterval(() => {
    timeLeft--;
    if (DOM.gameoverCountdown) DOM.gameoverCountdown.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(GameState.autoResetTimer);
      resetGame();
    }
  }, 1000);
}

// ===================================================================
// SISTEMA DE SALVAMENTO E PERSISTÊNCIA (LOCALSTORAGE)
// ===================================================================
const SAVE_KEY = 'fnaf_familias_saved_night';

function getSavedNight() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    const parsed = parseInt(saved, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      return Math.min(5, parsed); // Limite máximo de 5 noites
    }
    return 1;
  } catch (err) {
    return 1;
  }
}

function saveNight(night) {
  try {
    const capped = Math.min(5, Math.max(1, night));
    localStorage.setItem(SAVE_KEY, capped);
  } catch (err) {
    console.warn('Não foi possível salvar no localStorage:', err);
  }
}

function updateNightDisplays() {
  const nightText = `NOITE ${GameState.currentNight}`;
  document.querySelectorAll('.hud-night').forEach(el => {
    el.textContent = nightText;
  });
  if (DOM.winNightTitle) {
    DOM.winNightTitle.textContent = `${nightText} CONCLUÍDA`;
  }
}

function refreshContinueButton() {
  const saved = getSavedNight();
  if (DOM.menuContinueTag) {
    DOM.menuContinueTag.textContent = `NOITE ${saved}`;
  }

  // Se já zerou a Noite 5, exibe a estrela dourada de honra no menu principal
  try {
    const hasBeaten = localStorage.getItem('fnaf_familias_beaten') === 'true';
    const starEl = document.getElementById('menu-beaten-star');
    if (starEl) {
      starEl.style.display = hasBeaten ? 'inline-block' : 'none';
    }
  } catch (e) {}
}

// ===================================================================
// ESTÁTICA E GLITCH DOS PERSONAGENS NO MENU PRINCIPAL
// ===================================================================
function initMenuStatic() {
  const canvas = DOM.menuStaticCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = 320;
  const h = 180;
  canvas.width = w;
  canvas.height = h;

  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  if (GameState.menuStaticInterval) clearInterval(GameState.menuStaticInterval);

  GameState.menuStaticInterval = setInterval(() => {
    if (GameState.started) return;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }, 60);
}

// Efeito aleatório de Twitch / Glitch nos 3 personagens do fundo (estilo menu de FNAF 1)
function startMenuGlitches() {
  if (GameState.menuGlitchInterval) clearTimeout(GameState.menuGlitchInterval);

  function scheduleNextGlitch() {
    if (GameState.started) return;
    const delay = 2500 + Math.random() * 4500; // a cada 2.5s a 7s
    GameState.menuGlitchInterval = setTimeout(() => {
      if (GameState.started) return;
      if (DOM.menuCharacters) {
        DOM.menuCharacters.classList.add('glitching');
        
        // Efeito sutil de ruído/som elétrico em alguns glitches
        if (Math.random() < 0.35 && SoundFX.ctx) {
          SoundFX.playCameraSwitch();
        }

        setTimeout(() => {
          if (DOM.menuCharacters) DOM.menuCharacters.classList.remove('glitching');
          scheduleNextGlitch();
        }, 100 + Math.random() * 140);
      } else {
        scheduleNextGlitch();
      }
    }, delay);
  }

  scheduleNextGlitch();
}

// ===================================================================
// CONTROLE DE FLUXO: INICIAR JOGO E RETORNAR AO MENU
// ===================================================================
function startGame(nightNumber) {
  SoundFX.init();
  SoundFX.playMenuSelect();

  GameState.currentNight = nightNumber || 1;
  saveNight(GameState.currentNight);
  updateNightDisplays();

  // Limpa glitches do menu
  if (GameState.menuGlitchInterval) clearTimeout(GameState.menuGlitchInterval);
  if (GameState.menuStaticInterval) clearInterval(GameState.menuStaticInterval);

  // Animação de saída do menu
  DOM.mainMenu.classList.add('hidden');

  setTimeout(() => {
    DOM.mainMenu.style.display = 'none';
    GameState.started = true;
    initStaticCanvas();
    resetGame();
  }, 450);
}

function returnToMainMenu() {
  if (GameState.autoResetTimer) clearInterval(GameState.autoResetTimer);
  if (GameState.clockTimer) clearInterval(GameState.clockTimer);
  if (GameState.anxietyTimer) clearInterval(GameState.anxietyTimer);

  // Se o modo assistir estiver aberto, fecha imediatamente
  if (GameState.isWatching) {
    if (DOM.watchYoutubeIframe) DOM.watchYoutubeIframe.src = '';
    DOM.watchSystem.classList.remove('active');
    DOM.officeScene.classList.add('active');
    GameState.isWatching = false;
  }

  GameState.started = false;
  GameState.hasWon = false;
  GameState.isGameOver = false;
  GameState.anxiety = 0;
  updateAnxietyDisplays();
  if (DOM.anxietyHud) DOM.anxietyHud.classList.remove('active');

  // Interrompe IA e limpa personagens
  if (typeof CharacterSystem !== 'undefined') CharacterSystem.clearAll();

  // Esconde telas de vitória, game over e modal de controles
  DOM.winScreen.classList.remove('active');
  DOM.gameoverScreen.classList.remove('active');
  if (DOM.controlsModal) DOM.controlsModal.classList.remove('active');

  // Fecha monitor de câmeras se estiver aberto
  if (GameState.monitorUp) {
    DOM.cameraSystem.classList.remove('active');
    DOM.officeScene.classList.add('active');
    DOM.flipMonitorBar.classList.remove('monitor-up');
    GameState.monitorUp = false;
  }

  // Reseta porta para aberta
  GameState.doorClosed = false;
  DOM.bgDoorClosed.classList.remove('active');
  DOM.bgDoorOpen.classList.add('active');
  DOM.btnToggleDoor.classList.remove('closed');
  DOM.btnToggleDoor.classList.add('open');
  DOM.doorStatusText.textContent = 'ABERTA';

  // Atualiza etiqueta do botão Continuar com a noite salva
  refreshContinueButton();

  // Reabre o menu principal com estática e glitches
  DOM.mainMenu.style.display = 'flex';
  DOM.mainMenu.offsetHeight; // Força recálculo de estilo (reflow)
  DOM.mainMenu.classList.remove('hidden');

  initMenuStatic();
  startMenuGlitches();
}

// ===================================================================
// ===================================================================
// SISTEMA DE POSICIONAMENTO, ROTA E INTELIGÊNCIA ARTIFICIAL (IA)
// ===================================================================
const CharacterSystem = {
  // Índices do passo atual de cada personagem em suas respectivas rotas
  stepIndices: {
    pai: 0,
    mae: 0,
    irmao: 0
  },

  // Contagem de ticks que cada personagem está esperando na porta fechada
  doorWaitTicks: {
    pai: 0,
    mae: 0,
    irmao: 0
  },

  // Temporizador do loop de IA
  aiTimer: null,

  // Estado atual visível: { charId: { location, positionKey } }
  state: {
    pai: null,
    mae: null,
    irmao: null
  },

  // Inicia a IA e posiciona todos nos pontos de partida
  init() {
    this.stopAiLoop();
    this.resetAllToStart();
    this.startAiLoop();
    console.log('[CharacterSystem] IA iniciada para a Noite', GameState.currentNight);
  },

  // Coloca cada personagem no seu quarto inicial
  resetAllToStart() {
    for (const charId of Object.keys(CONFIG.CHARACTERS)) {
      this.stepIndices[charId] = 0;
      this.doorWaitTicks[charId] = 0;
      const initialStep = CONFIG.AI_ROUTES[charId][0];
      this.state[charId] = {
        location: initialStep.location,
        positionKey: initialStep.positionKey
      };
    }
    this.render();
  },

  // Inicia o ciclo periódico de IA (a cada 4.5s)
  startAiLoop() {
    if (this.aiTimer) clearInterval(this.aiTimer);
    this.aiTimer = setInterval(() => {
      this.tickAi();
    }, CONFIG.AI_CONFIG.TICK_INTERVAL_MS);
  },

  // Para o loop de IA
  stopAiLoop() {
    if (this.aiTimer) {
      clearInterval(this.aiTimer);
      this.aiTimer = null;
    }
  },

  // Obtém o nível de agressividade/atividade de acordo com a noite e a hora
  getAiLevel(charId) {
    const night = Math.min(5, Math.max(1, GameState.currentNight));
    const baseLevels = CONFIG.AI_CONFIG.NIGHT_LEVELS[night] || CONFIG.AI_CONFIG.NIGHT_LEVELS[1];
    let level = baseLevels[charId] || 1;

    // Regras de liberação gradual na Noite 1 (estilo clássico FNAF)
    if (night === 1) {
      if (charId === 'pai' && GameState.currentHour < 2) return 0;
      if (charId === 'mae' && GameState.currentHour < 1) return 0;
    }

    // A cada 2 horas passadas na noite, a IA ganha +1 de bônus
    const hourBonus = Math.floor(GameState.currentHour / 2);
    return Math.min(20, level + hourBonus);
  },

  // Oportunidade de movimento executada a cada tick
  tickAi() {
    if (!GameState.started || GameState.hasWon || GameState.isGameOver) return;

    for (const charId of Object.keys(CONFIG.CHARACTERS)) {
      this.processCharacter(charId);
    }
  },

  // Processa a movimentação individual de um personagem
  processCharacter(charId) {
    const route = CONFIG.AI_ROUTES[charId];
    const currentIndex = this.stepIndices[charId];
    const isAtDoor = currentIndex >= route.length - 1;

    // SE O PERSONAGEM JÁ CHEGOU NA PORTA
    if (isAtDoor) {
      if (GameState.doorClosed) {
        // Jogador fechou a porta! O personagem é bloqueado
        this.doorWaitTicks[charId]++;

        if (this.doorWaitTicks[charId] === 1) {
          SoundFX.playDoorKnock();
        } else if (this.doorWaitTicks[charId] >= CONFIG.AI_CONFIG.DOOR_ATTACK_TICKS) {
          // Desiste e recua pelo corredor
          this.retreat(charId);
        }
      } else {
        // Porta está aberta!
        // OBS: Conforme instruído, sem jumpscare por enquanto.
        // O personagem permanece na porta vigiando o escritório até o jogador fechar.
        this.doorWaitTicks[charId] = 0;
      }
      return;
    }

    // SE O PERSONAGEM NÃO ESTÁ NA PORTA, TESTA SE VAI AVANÇAR
    const aiLevel = this.getAiLevel(charId);
    if (aiLevel <= 0) return;

    // Rolagem d20 clássica estilo FNAF
    const roll = Math.floor(Math.random() * 20) + 1;
    if (roll <= aiLevel) {
      this.advance(charId);
    }
  },

  // Avança 1 passo na rota
  advance(charId) {
    const route = CONFIG.AI_ROUTES[charId];
    const prevLocation = route[this.stepIndices[charId]].location;

    this.stepIndices[charId] = Math.min(route.length - 1, this.stepIndices[charId] + 1);
    const newStep = route[this.stepIndices[charId]];

    this.state[charId] = {
      location: newStep.location,
      positionKey: newStep.positionKey
    };

    // Estática na câmera se o jogador estiver olhando
    if (GameState.monitorUp) {
      if (GameState.currentCamera === prevLocation || GameState.currentCamera === newStep.location) {
        triggerStaticBurst();
      }
    }

    SoundFX.playFootsteps();
    this.render();
  },

  // Faz o personagem recuar após bater na porta fechada
  retreat(charId) {
    const prevLocation = this.state[charId].location;
    // Volta 3 passos atrás na rota (para o meio do corredor ou sala)
    this.stepIndices[charId] = Math.max(1, this.stepIndices[charId] - 3);
    this.doorWaitTicks[charId] = 0;

    const newStep = CONFIG.AI_ROUTES[charId][this.stepIndices[charId]];
    this.state[charId] = {
      location: newStep.location,
      positionKey: newStep.positionKey
    };

    if (GameState.monitorUp && (GameState.currentCamera === newStep.location || GameState.currentCamera === prevLocation)) {
      triggerStaticBurst();
    }

    SoundFX.playFootsteps();
    this.render();
  },

  // Chamado quando o jogador aperta ESPAÇO ou clica no botão de fechar a porta
  onDoorClosed() {
    for (const charId of Object.keys(CONFIG.CHARACTERS)) {
      const route = CONFIG.AI_ROUTES[charId];
      if (this.stepIndices[charId] >= route.length - 1) {
        // Personagem estava na porta bem no momento que fechou!
        SoundFX.playDoorKnock();
        this.doorWaitTicks[charId] = 1;
      }
    }
  },

  // Define manualmente (usado para testes e comandos)
  set(charId, location, positionKey) {
    if (!CONFIG.CHARACTERS[charId]) return;
    this.state[charId] = { location, positionKey };
    this.render();
  },

  // Envia um personagem direto para a porta (atalho de teste)
  sendToDoor(charId) {
    if (!CONFIG.CHARACTERS[charId]) return;
    const route = CONFIG.AI_ROUTES[charId];
    this.stepIndices[charId] = route.length - 1;
    this.doorWaitTicks[charId] = 0;
    const step = route[this.stepIndices[charId]];
    this.state[charId] = { location: step.location, positionKey: step.positionKey };
    SoundFX.playFootsteps();
    this.render();
  },

  // Remove um personagem específico do cenário
  remove(charId) {
    this.state[charId] = null;
    this.render();
  },

  // Limpa tudo
  clearAll() {
    this.stopAiLoop();
    for (const charId of Object.keys(this.state)) {
      this.state[charId] = null;
      this.stepIndices[charId] = 0;
      this.doorWaitTicks[charId] = 0;
    }
    this.render();
  },

  // Renderiza tanto no escritório quanto na câmera aberta
  render() {
    this.renderOffice();
    this.renderActiveCamera();
  },

  // Renderiza no escritório (quando na porta aberta)
  renderOffice() {
    if (!DOM.officeCharacterLayer) return;
    DOM.officeCharacterLayer.innerHTML = '';

    for (const [charId, data] of Object.entries(this.state)) {
      if (data && data.location === 'door') {
        const doorPositions = CONFIG.POSITIONS.door;
        const pos = (doorPositions && (
          doorPositions[data.positionKey] ||
          doorPositions[`atDoor_${charId}`] ||
          doorPositions.atDoor
        )) || { x: 43.4, y: 99.6, height: 92.5, brightness: 90 };
        const charData = CONFIG.CHARACTERS[charId];

        const el = document.createElement('div');
        el.className = 'game-character';
        el.id = `char-office-${charId}`;
        el.style.left = `${pos.x}%`;
        el.style.top = `${pos.y}%`;
        el.style.height = `${pos.height}%`;
        el.style.filter = `brightness(${pos.brightness || 90}%) drop-shadow(0 0 12px rgba(0,0,0,0.9))`;
        el.innerHTML = `<img src="${charData.src}" alt="${charData.name}">`;
        DOM.officeCharacterLayer.appendChild(el);
      }
    }
  },

  // Renderiza na câmera ativa
  renderActiveCamera() {
    if (!DOM.cameraCharacterLayer) return;
    DOM.cameraCharacterLayer.innerHTML = '';

    const currentCam = GameState.currentCamera;
    for (const [charId, data] of Object.entries(this.state)) {
      if (data && data.location === currentCam) {
        const camPositions = CONFIG.POSITIONS[currentCam];
        if (!camPositions) continue;

        const pos = camPositions[data.positionKey] || Object.values(camPositions)[1];
        if (!pos) continue;

        const charData = CONFIG.CHARACTERS[charId];
        const el = document.createElement('div');
        el.className = 'game-character';
        el.id = `char-cam-${charId}`;
        el.style.left = `${pos.x}%`;
        el.style.top = `${pos.y}%`;
        el.style.height = `${pos.height}%`;
        el.style.filter = `brightness(${pos.brightness || 80}%) drop-shadow(0 0 12px rgba(0,0,0,0.9))`;
        el.innerHTML = `<img src="${charData.src}" alt="${charData.name}">`;
        DOM.cameraCharacterLayer.appendChild(el);
      }
    }
  }
};

// Expõe globalmente para manipulação pelo console ou scripts externos
window.CharacterSystem = CharacterSystem;

function resetGame() {
  if (GameState.autoResetTimer) clearInterval(GameState.autoResetTimer);
  if (GameState.clockTimer) clearInterval(GameState.clockTimer);
  if (GameState.anxietyTimer) clearInterval(GameState.anxietyTimer);

  // Se o modo assistir estiver aberto, fecha imediatamente
  if (GameState.isWatching) {
    if (DOM.watchYoutubeIframe) DOM.watchYoutubeIframe.src = '';
    DOM.watchSystem.classList.remove('active');
    DOM.officeScene.classList.add('active');
    GameState.isWatching = false;
  }

  // Inicializa posições e IA dos personagens
  CharacterSystem.init();

  // Esconde telas de vitória e game over
  DOM.winScreen.classList.remove('active');
  DOM.gameoverScreen.classList.remove('active');
  if (DOM.btnWinRestart) {
    DOM.btnWinRestart.style.display = (GameState.currentNight >= 5) ? 'none' : 'block';
  }

  // Reseta estado da noite e ansiedade
  GameState.currentHour = 0;
  GameState.anxiety = CONFIG.ANXIETY.INITIAL;
  GameState.hasWon = false;
  GameState.isGameOver = false;
  GameState.isTransitioning = false;
  GameState.doorClosed = false;
  GameState.monitorUp = false;
  GameState.isWatching = false;
  GameState.currentCamera = 'cam1';

  // Reseta a porta para aberta
  DOM.bgDoorClosed.classList.remove('active');
  DOM.bgDoorOpen.classList.add('active');
  DOM.btnToggleDoor.classList.remove('closed');
  DOM.btnToggleDoor.classList.add('open');
  DOM.doorStatusText.textContent = 'ABERTA';

  // Garante que está no escritório
  DOM.cameraSystem.classList.remove('active');
  DOM.officeScene.classList.add('active');
  DOM.flipMonitorBar.classList.remove('monitor-up');

  // Atualiza relógios, noites e ansiedade
  updateNightDisplays();
  updateClockDisplays();
  updateAnxietyDisplays();
  if (DOM.anxietyHud) DOM.anxietyHud.classList.add('active');

  // Reinicia o relógio da noite e o medidor de ansiedade
  startNightTimer();
  startAnxietyTimer();
}

// ===================================================================
// CONTROLES DE TECLADO E EVENTOS
// ===================================================================
function setupEvents() {
  // 1. Botão NOVO JOGO
  if (DOM.btnNewGame) {
    DOM.btnNewGame.addEventListener('click', () => {
      const saved = getSavedNight();
      if (saved > 1) {
        const confirmReset = window.confirm(`Você possui progresso salvo na Noite ${saved}.\nIniciar um Novo Jogo reiniciará a partir da Noite 1.\nDeseja continuar?`);
        if (!confirmReset) return;
      }
      startGame(1);
    });
  }

  // 2. Botão CONTINUAR
  if (DOM.btnContinueGame) {
    DOM.btnContinueGame.addEventListener('click', () => {
      const saved = getSavedNight();
      startGame(saved);
    });
  }

  // 3. Modal de Como Jogar / Controles
  if (DOM.btnShowControls && DOM.controlsModal) {
    DOM.btnShowControls.addEventListener('click', () => {
      SoundFX.init();
      SoundFX.playMenuHover();
      DOM.controlsModal.classList.add('active');
    });
  }

  if (DOM.btnCloseControls && DOM.controlsModal) {
    DOM.btnCloseControls.addEventListener('click', () => {
      DOM.controlsModal.classList.remove('active');
    });
  }

  // Efeito sonoro de hover em todos os botões do menu
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      SoundFX.init();
      SoundFX.playMenuHover();
    });
  });

  // 4. Botão Voltar ao Menu no HUD do Escritório
  if (DOM.btnReturnMenu) {
    DOM.btnReturnMenu.addEventListener('click', returnToMainMenu);
  }

  // 5. Botões das Telas de Vitória e Game Over
  if (DOM.btnWinRestart) {
    DOM.btnWinRestart.addEventListener('click', resetGame);
  }
  if (DOM.btnWinMenu) {
    DOM.btnWinMenu.addEventListener('click', returnToMainMenu);
  }

  if (DOM.btnGameoverRestart) {
    DOM.btnGameoverRestart.addEventListener('click', resetGame);
  }
  if (DOM.btnGameoverMenu) {
    DOM.btnGameoverMenu.addEventListener('click', returnToMainMenu);
  }

  // 6. Botão da Porta
  DOM.btnToggleDoor.addEventListener('click', toggleDoor);

  // 6.5 Botões do Modo Assistir TV / Celular (Anti-Ansiedade)
  if (DOM.btnToggleWatch) {
    DOM.btnToggleWatch.addEventListener('click', toggleWatch);
  }
  if (DOM.watchEdgeTab) {
    DOM.watchEdgeTab.addEventListener('click', toggleWatch);
  }
  if (DOM.btnExitWatch) {
    DOM.btnExitWatch.addEventListener('click', closeWatch);
  }

  // 7. Barra de puxar monitor
  DOM.flipMonitorBar.addEventListener('click', toggleMonitor);

  // 8. Botões de câmera no minimapa
  DOM.camButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cam = btn.dataset.cam;
      setCamera(cam);
    });
  });

  // 9. Atalhos de teclado
  window.addEventListener('keydown', (e) => {
    // Tecla ESC: Fecha modal de controles, fecha tela de assistir ou retorna ao menu
    if (e.code === 'Escape') {
      if (DOM.controlsModal && DOM.controlsModal.classList.contains('active')) {
        DOM.controlsModal.classList.remove('active');
        return;
      }
      if (GameState.isWatching) {
        closeWatch();
        return;
      }
      if (GameState.started) {
        returnToMainMenu();
        return;
      }
    }

    if (!GameState.started) return;

    // Se estiver em Game Over ou Vitória, bloqueia comandos normais de jogo
    if (GameState.isGameOver || GameState.hasWon) return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        toggleDoor();
        break;

      case 'KeyC':
      case 'KeyS':
      case 'ArrowDown':
        e.preventDefault();
        toggleMonitor();
        break;

      // Tecla V: Alterna modo Assistir TV (Anti-Ansiedade)
      case 'KeyV':
        e.preventDefault();
        toggleWatch();
        break;

      case 'Digit1':
      case 'Numpad1':
        if (GameState.monitorUp) setCamera('cam1');
        break;

      case 'Digit2':
      case 'Numpad2':
        if (GameState.monitorUp) setCamera('cam2');
        break;

      case 'Digit3':
      case 'Numpad3':
        if (GameState.monitorUp) setCamera('cam3');
        break;

      case 'Digit4':
      case 'Numpad4':
        if (GameState.monitorUp) setCamera('cam4');
        break;

      // Atalho de teste rápido: tecla 'T' avança 1 hora
      case 'KeyT':
        GameState.currentHour++;
        updateClockDisplays();
        SoundFX.playHourTick();
        if (GameState.currentHour >= CONFIG.TIME.TOTAL_HOURS) {
          triggerWin();
        }
        break;

      // Atalhos de teste dev: +10% e -10% de ansiedade
      case 'KeyK':
        cheatAddAnxiety(10);
        break;
      case 'KeyJ':
        cheatAddAnxiety(-10);
        break;

      // Atalhos de teste dev: testar personagens na porta e resetar
      case 'KeyP':
        if (typeof CharacterSystem !== 'undefined') CharacterSystem.sendToDoor('pai');
        break;
      case 'KeyM':
        if (typeof CharacterSystem !== 'undefined') CharacterSystem.sendToDoor('mae');
        break;
      case 'KeyI':
        if (typeof CharacterSystem !== 'undefined') CharacterSystem.sendToDoor('irmao');
        break;
      case 'KeyR':
        if (typeof CharacterSystem !== 'undefined') CharacterSystem.resetAllToStart();
        break;
    }
  });

  // Funções acessíveis no console para teste rápido
  window.sendToDoor = (charId = 'pai') => CharacterSystem.sendToDoor(charId);
  window.resetCharacters = () => CharacterSystem.resetAllToStart();
  window.advanceHour = () => {
    if (GameState.started && !GameState.hasWon && !GameState.isGameOver) {
      GameState.currentHour++;
      updateClockDisplays();
      SoundFX.playHourTick();
      if (GameState.currentHour >= CONFIG.TIME.TOTAL_HOURS) {
        triggerWin();
      }
    }
  };
  window.toggleWatch = toggleWatch;
  window.addAnxiety = cheatAddAnxiety;
  window.triggerGameOver = triggerGameOver;
  window.resetNight = resetGame;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  GameState.currentNight = getSavedNight();
  updateNightDisplays();
  refreshContinueButton();
  initMenuStatic();
  startMenuGlitches();
  setupEvents();
  console.log('5 DIAS JOGANDO TARDE carregado com sucesso! Menu principal ativo.');
});
