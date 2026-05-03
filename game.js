(function () {
  "use strict";

  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg) {
    tg.ready();
    tg.expand();
  }

  const DONATE_URL = "https://t.me/appsmeridian_bot?start=dl-1777825418218";
  const CHANNEL_URL = "https://t.me/+N-lQ58PBI9ZiMDJi";
  const USE_CARD_IMAGES = true;
  const CARD_ASSET_VERSION = "20260503-53";
  const MUSIC_TRACKS = [
    "./assets/audio/cooking-with-the-italians.mp3",
    "./assets/audio/the-little-cafe.mp3"
  ];
  const AUDIO_SETTINGS_VERSION = 4;
  const LEGACY_DEFAULT_AUDIO_SETTINGS = {
    musicVolume: 28,
    voiceVolume: 90,
    sfxVolume: 70,
    vibrationEnabled: true
  };
  const DEFAULT_AUDIO_SETTINGS = {
    musicVolume: 9,
    voiceVolume: 65,
    sfxVolume: 50,
    vibrationEnabled: true
  };
  const VOLUME_LIMITS = {
    musicVolume: 100,
    voiceVolume: 100,
    sfxVolume: 100
  };
  const VOICE_CLIPS = {
    scopaPlayer: [
      "./assets/audio/voice/player-scopa01.mp3",
      "./assets/audio/voice/player-scopa02.mp3",
      "./assets/audio/voice/player-scopa03.mp3",
      "./assets/audio/voice/player-scopa04.mp3",
      "./assets/audio/voice/player-scopa05.mp3",
      "./assets/audio/voice/player-scopa06.mp3",
      "./assets/audio/voice/player-scopa07.mp3",
      "./assets/audio/voice/player-scopa08.mp3",
      "./assets/audio/voice/player-scopa09.mp3",
      "./assets/audio/voice/player-scopa10.mp3",
      "./assets/audio/voice/player-scopa11.mp3",
      "./assets/audio/voice/player-scopa12.mp3"
    ],
    scopaBot: [
      "./assets/audio/voice/bot-scopa00.mp3",
      "./assets/audio/voice/bot-scopa01.mp3",
      "./assets/audio/voice/bot-scopa02.mp3",
      "./assets/audio/voice/bot-scopa03.mp3",
      "./assets/audio/voice/bot-scopa04.mp3",
      "./assets/audio/voice/bot-scopa05.mp3",
      "./assets/audio/voice/bot-scopa06.mp3",
      "./assets/audio/voice/bot-scopa07.mp3",
      "./assets/audio/voice/bot-scopa08.mp3",
      "./assets/audio/voice/bot-scopa09.mp3",
      "./assets/audio/voice/bot-scopa10.mp3",
      "./assets/audio/voice/bot-scopa11.mp3",
      "./assets/audio/voice/bot-scopa12.mp3",
      "./assets/audio/voice/bot-scopa13.mp3",
      "./assets/audio/voice/bot-scopa14.mp3",
      "./assets/audio/voice/bot-scopa15.mp3",
      "./assets/audio/voice/bot-scopa16.mp3"
    ],
    invalidMove: [
      "./assets/audio/voice/player-error01.mp3",
      "./assets/audio/voice/player-error02.mp3",
      "./assets/audio/voice/player-error03.mp3",
      "./assets/audio/voice/player-error04.mp3",
      "./assets/audio/voice/player-error05.mp3",
      "./assets/audio/voice/player-error06.mp3",
      "./assets/audio/voice/player-error07.mp3",
      "./assets/audio/voice/player-error08.mp3",
      "./assets/audio/voice/player-error09.mp3",
      "./assets/audio/voice/player-error10.mp3",
      "./assets/audio/voice/player-error11.mp3",
      "./assets/audio/voice/player-error12.mp3",
      "./assets/audio/voice/player-error13.mp3",
      "./assets/audio/voice/player-error14.mp3",
      "./assets/audio/voice/player-error15.mp3",
      "./assets/audio/voice/player-error16.mp3",
      "./assets/audio/voice/player-error17.mp3",
      "./assets/audio/voice/player-error18.mp3",
      "./assets/audio/voice/player-error19.mp3"
    ],
    mustTakeSingle: [
      "./assets/audio/voice/player-card-no-sum01.mp3",
      "./assets/audio/voice/player-card-no-sum02.mp3",
      "./assets/audio/voice/player-card-no-sum03.mp3",
      "./assets/audio/voice/player-card-no-sum04.mp3",
      "./assets/audio/voice/player-card-no-sum05.mp3",
      "./assets/audio/voice/player-card-no-sum06.mp3",
      "./assets/audio/voice/player-card-no-sum07.mp3"
    ],
    settebello: [
      "./assets/audio/voice/settebello01.mp3",
      "./assets/audio/voice/settebello02.mp3",
      "./assets/audio/voice/settebello03.mp3",
      "./assets/audio/voice/settebello04.mp3",
      "./assets/audio/voice/settebello05.mp3",
      "./assets/audio/voice/settebello06.mp3",
      "./assets/audio/voice/settebello07.mp3",
      "./assets/audio/voice/settebello08.mp3",
      "./assets/audio/voice/settebello09.mp3",
      "./assets/audio/voice/settebello10.mp3"
    ],
    roundWinPlayer: [
      "./assets/audio/voice/round-win-player01.mp3",
      "./assets/audio/voice/round-win-player02.mp3",
      "./assets/audio/voice/round-win-player03.mp3",
      "./assets/audio/voice/round-win-player04.mp3",
      "./assets/audio/voice/round-win-player05.mp3",
      "./assets/audio/voice/round-win-player06.mp3",
      "./assets/audio/voice/round-win-player07.mp3",
      "./assets/audio/voice/round-win-player08.mp3"
    ],
    roundWinBot: [
      "./assets/audio/voice/round-win-bot01.mp3",
      "./assets/audio/voice/round-win-bot02.mp3",
      "./assets/audio/voice/round-win-bot03.mp3",
      "./assets/audio/voice/round-win-bot04.mp3",
      "./assets/audio/voice/round-win-bot05.mp3",
      "./assets/audio/voice/round-win-bot06.mp3",
      "./assets/audio/voice/round-win-bot07.mp3",
      "./assets/audio/voice/round-win-bot08.mp3"
    ],
    matchWinPlayer: [
      "./assets/audio/voice/match-win-player01.mp3",
      "./assets/audio/voice/match-win-player02.mp3",
      "./assets/audio/voice/match-win-player03.mp3",
      "./assets/audio/voice/match-win-player04.mp3",
      "./assets/audio/voice/match-win-player05.mp3",
      "./assets/audio/voice/match-win-player06.mp3",
      "./assets/audio/voice/match-win-player07.mp3",
      "./assets/audio/voice/match-win-player08.mp3",
      "./assets/audio/voice/match-win-player09.mp3",
      "./assets/audio/voice/match-win-player10.mp3"
    ],
    matchLosePlayer: [
      "./assets/audio/voice/match-lose-player01.mp3",
      "./assets/audio/voice/match-lose-player02.mp3",
      "./assets/audio/voice/match-lose-player03.mp3",
      "./assets/audio/voice/match-lose-player04.mp3",
      "./assets/audio/voice/match-lose-player05.mp3",
      "./assets/audio/voice/match-lose-player06.mp3",
      "./assets/audio/voice/match-lose-player07.mp3",
      "./assets/audio/voice/match-lose-player08.mp3"
    ],
    dealChatterRare: [
      "./assets/audio/voice/deal-chatter-rare01.mp3",
      "./assets/audio/voice/deal-chatter-rare02.mp3"
    ]
  };
  const audioSettings = loadAudioSettings();
  const sound = createSoundEngine(audioSettings.sfxVolume);
  const music = createMusicPlayer(MUSIC_TRACKS, audioSettings.musicVolume);
  const voice = createVoicePlayer(VOICE_CLIPS, audioSettings.voiceVolume, {
    onStart: () => music.duck(),
    onEnd: () => music.restore()
  });

  const suits = [
    { id: "denari", name: "Пентакли", icon: "?" },
    { id: "coppe", name: "Кубки", icon: "¦" },
    { id: "spade", name: "Мечи", icon: "¦" },
    { id: "bastoni", name: "Жезлы", icon: "¦" }
  ];
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const rankNames = { 1: "Туз", 8: "Валет", 9: "Рыцарь", 10: "Король" };
  const suitNamesGenitive = {
    denari: "пентаклей",
    coppe: "кубков",
    spade: "мечей",
    bastoni: "жезлов"
  };
  const primiera = { 7: 21, 6: 18, 1: 16, 5: 15, 4: 14, 3: 13, 2: 12, 8: 10, 9: 10, 10: 10 };

  const playerScoreEl = document.getElementById("playerScore");
  const appShell = document.querySelector(".app-shell");
  const botScoreEl = document.getElementById("botScore");
  const playerAvatarCounter = document.getElementById("playerAvatarCounter");
  const botAvatarCounter = document.getElementById("botAvatarCounter");
  const deckCountEl = document.getElementById("deckCount");
  const botHandEl = document.getElementById("botHand");
  const playerScopaEl = document.getElementById("playerScopa");
  const botScopaEl = document.getElementById("botScopa");
  const tableSumEl = document.getElementById("tableSum");
  const tableCardsEl = document.getElementById("tableCards");
  const playerHandEl = document.getElementById("playerHand");
  const playButton = document.getElementById("playButton");
  const statusText = document.getElementById("statusText");
  const roundPanel = document.getElementById("roundPanel");
  const roundBreakdown = document.getElementById("roundBreakdown");
  const nextRoundButton = document.getElementById("nextRoundButton");
  const newMatchButton = document.getElementById("newMatchButton");
  const backHomeButton = document.getElementById("backHomeButton");
  const musicButton = document.getElementById("musicButton");
  const settingsButton = document.getElementById("settingsButton");
  const settingsPanel = document.getElementById("settingsPanel");
  const closeSettingsButton = document.getElementById("closeSettingsButton");
  const developersPanel = document.getElementById("developersPanel");
  const closeDevelopersButton = document.getElementById("closeDevelopersButton");
  const supportFeaturePanel = document.getElementById("supportFeaturePanel");
  const closeSupportFeatureButton = document.getElementById("closeSupportFeatureButton");
  const musicVolume = document.getElementById("musicVolume");
  const voiceVolume = document.getElementById("voiceVolume");
  const sfxVolume = document.getElementById("sfxVolume");
  const vibrationToggle = document.getElementById("vibrationToggle");
  const musicVolumeValue = document.getElementById("musicVolumeValue");
  const voiceVolumeValue = document.getElementById("voiceVolumeValue");
  const sfxVolumeValue = document.getElementById("sfxVolumeValue");
  const channelButton = document.getElementById("channelButton");
  const donateButton = document.getElementById("donateButton");
  const rulesButton = document.getElementById("rulesButton");
  const topRulesCardButton = document.getElementById("topRulesCardButton");
  const rulesPanel = document.getElementById("rulesPanel");
  const closeRulesButton = document.getElementById("closeRulesButton");
  const loadingScreen = document.getElementById("loadingScreen");
  const homeScreen = document.getElementById("homeScreen");
  const quickPlayButton = document.getElementById("quickPlayButton");
  const homeChannelButton = document.getElementById("homeChannelButton");
  const homeRulesButton = document.getElementById("homeRulesButton");
  const homeSoundButton = document.getElementById("homeSoundButton");
  const homeSettingsButton = document.getElementById("homeSettingsButton");
  const homeNewMatchButton = document.getElementById("homeNewMatchButton");
  const homeOnlineButton = document.getElementById("homeOnlineButton");
  const homeFriendButton = document.getElementById("homeFriendButton");
  const homeDevelopersButton = document.getElementById("homeDevelopersButton");
  const scopaCelebration = document.getElementById("scopaCelebration");
  const scopaCelebrationText = document.getElementById("scopaCelebrationText");
  const confettiLayer = document.getElementById("confettiLayer");
  const modalBackdrop = document.getElementById("modalBackdrop");

  let match;

  function createDeck() {
    const deck = [];
    for (const suit of suits) {
      for (let i = 0; i < ranks.length; i += 1) {
        deck.push({
          id: `${suit.id}-${ranks[i]}`,
          suit: suit.id,
          suitName: suit.name,
          icon: suit.icon,
          rank: ranks[i],
          value: i + 1
        });
      }
    }
    return shuffle(deck);
  }

  function shuffle(deck) {
    const copy = deck.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function newMatch() {
    sound.play("deal");
    match = { scores: { player: 0, bot: 0 }, roundNumber: 0, round: null };
    startRound();
  }

  function startRound() {
    match.roundNumber += 1;
    const deck = createDeck();
    match.round = {
      deck,
      table: deck.splice(0, 4),
      playerHand: deck.splice(0, 3),
      botHand: deck.splice(0, 3),
      captures: { player: [], bot: [] },
      scope: { player: 0, bot: 0 },
      selectedHandId: null,
      selectedTableIds: new Set(),
      lastCapture: null,
      nextBotDelay: 650,
      turn: "player",
      ended: false
    };
    roundPanel.hidden = true;
    setStatus("Выберите карту. Для взятки отметьте карты на столе с такой же суммой.", "");
    render();
    preloadRoundImages();
    hideLoading();
    if (Math.random() < 0.18) voice.play("dealChatterRare", 700);
  }

  function render() {
    const round = match.round;
    playerScoreEl.textContent = String(match.scores.player);
    botScoreEl.textContent = String(match.scores.bot);
    playerAvatarCounter.textContent = String(match.scores.player);
    botAvatarCounter.textContent = String(match.scores.bot);
    deckCountEl.textContent = String(round.deck.length);
    playerScopaEl.textContent = String(round.scope.player);
    botScopaEl.textContent = String(round.scope.bot);

    botHandEl.innerHTML = "";
    for (let i = 0; i < round.botHand.length; i += 1) {
      const back = document.createElement("div");
      back.className = "card-back";
      botHandEl.appendChild(back);
    }

    tableSumEl.textContent = String(sumCards(round.table.filter((card) => round.selectedTableIds.has(card.id))));
    tableCardsEl.innerHTML = "";
    if (round.table.length === 0) {
      tableCardsEl.appendChild(emptyText("Стол пуст"));
    } else {
      for (const card of round.table) {
        tableCardsEl.appendChild(cardButton(card, "table"));
      }
    }

    playerHandEl.innerHTML = "";
    for (const card of round.playerHand) {
      playerHandEl.appendChild(cardButton(card, "hand"));
    }

    playButton.disabled = !round.selectedHandId || round.turn !== "player" || round.ended;
    playButton.textContent = round.selectedTableIds.size > 0 ? "Забрать" : "Положить";
  }

  function cardButton(card, zone) {
    const round = match.round;
    const button = document.createElement("button");
    const selected = zone === "hand" ? round.selectedHandId === card.id : round.selectedTableIds.has(card.id);
    button.type = "button";
    button.className = `card ${card.suit}${selected ? " selected" : ""}`;
    button.setAttribute("aria-label", `${displayRank(card)} ${card.suitName}`);
    if (USE_CARD_IMAGES) {
      button.classList.add("card-image-button");
      button.innerHTML = `<img class="card-image" src="${cardImagePath(card)}" alt="" loading="eager" decoding="async">`;
    } else {
      button.innerHTML = `
        <span class="card-corner card-corner-top"><span>${card.rank}</span><span>${card.icon}</span></span>
        ${card.value <= 7 ? pipGrid(card) : courtArt(card)}
        <span class="card-corner card-corner-bottom"><span>${card.rank}</span><span>${card.icon}</span></span>
      `;
    }
    button.addEventListener("click", () => {
      if (round.turn !== "player" || round.ended) return;
      if (zone === "hand") selectHand(card.id);
      else toggleTable(card.id);
    });
    return button;
  }

  function cardImagePath(card) {
    return `./assets/cards/${card.suit}-${card.value}.png?v=${CARD_ASSET_VERSION}`;
  }

  function preloadRoundImages() {
    if (!USE_CARD_IMAGES || !match || !match.round) return;
    const round = match.round;
    const cards = [...round.deck, ...round.table, ...round.playerHand, ...round.botHand];
    for (const card of cards) preloadImage(cardImagePath(card));
    preloadImage(`./assets/cards/back.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/felt-bg.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/wood-panel-bot.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/wood-panel-player.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/top-wood-panel.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/bot-avatar.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/player-avatar.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/scopa-medal.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/counter-badge.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/scopa-logo.png?v=${CARD_ASSET_VERSION}`);
    preloadImage(`./assets/ui/rules-card.png?v=${CARD_ASSET_VERSION}`);
  }

  function preloadImage(src) {
    if (!src) return;
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    if (typeof image.decode === "function") image.decode().catch(() => {});
  }

  function pipGrid(card) {
    const pips = Array.from({ length: card.value }, (_, index) => {
      const slot = pipSlots(card.value)[index];
      return `<span class="pip ${slot}">${card.icon}</span>`;
    }).join("");
    return `<span class="pip-grid pips-${card.value}" aria-hidden="true">${pips}</span>`;
  }

  function pipSlots(value) {
    return {
      1: ["center"],
      2: ["top-center", "bottom-center"],
      3: ["top-center", "center", "bottom-center"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
      7: ["top-left", "top-right", "middle-left", "middle-right", "center", "bottom-left", "bottom-right"]
    }[value];
  }

  function courtArt(card) {
    const title = displayRank(card);
    const crest = card.value === 8 ? "V" : card.value === 9 ? "R" : "K";
    return `
      <span class="court-art" aria-hidden="true">
        <span class="court-crest">${crest}</span>
        <span class="court-head"></span>
        <span class="court-body"></span>
        <span class="court-prop">${card.icon}</span>
        <span class="court-title">${title}</span>
      </span>
    `;
  }

  function emptyText(text) {
    const item = document.createElement("div");
    item.className = "section-label";
    item.textContent = text;
    return item;
  }

  function displayRank(card) {
    return rankNames[card.rank] || card.rank;
  }

  function selectHand(cardId) {
    const round = match.round;
    round.selectedHandId = round.selectedHandId === cardId ? null : cardId;
    round.selectedTableIds.clear();
    sound.play("tap");
    setStatus("Теперь выберите карты на столе с такой же суммой или сыграйте карту без взятки.", "");
    render();
  }

  function toggleTable(cardId) {
    const round = match.round;
    if (!round.selectedHandId) {
      sound.play("warn");
      triggerHaptic("error");
      setStatus("Сначала выберите карту из руки.", "warn");
      return;
    }
    if (round.selectedTableIds.has(cardId)) round.selectedTableIds.delete(cardId);
    else round.selectedTableIds.add(cardId);
    sound.play("tap");
    render();
  }

  function playSelected() {
    const round = match.round;
    clearCardSelectionDom();
    const card = removeById(round.playerHand, round.selectedHandId);
    if (!card) return;

    const picked = round.table.filter((tableCard) => round.selectedTableIds.has(tableCard.id));
    const selectedSum = sumCards(picked);
    if (picked.length > 0 && selectedSum !== card.value) {
      round.playerHand.push(card);
      sound.play("warn");
      triggerHaptic("error");
      voice.play("invalidMove");
      setStatus(`Сумма выбранных карт ${selectedSum}, нужна ${card.value}.`, "warn");
      render();
      return;
    }

    const exactTableCard = round.table.find((tableCard) => tableCard.value === card.value);
    if (picked.length > 1 && exactTableCard) {
      round.playerHand.push(card);
      sound.play("warn");
      triggerHaptic("error");
      voice.play("mustTakeSingle");
      setStatus(`По правилам нужно взять одиночную карту ${displayCard(exactTableCard)}.`, "warn");
      render();
      return;
    }

    if (picked.length === 0 && captureOptions(card, round.table).length > 0) {
      round.playerHand.push(card);
      sound.play("warn");
      triggerHaptic("error");
      voice.play("invalidMove");
      setStatus("Эта карта может быть сыграна, сбросить ее нельзя!", "warn");
      render();
      return;
    }

    if (picked.length === 0) {
      round.table.push(card);
      sound.play("place");
      setStatus(`Вы положили ${displayCard(card)} на стол.`, "");
    } else {
      capture("player", card, picked);
      sound.play("capture");
      triggerHaptic("capture");
      setStatus(`Вы взяли ${formatCardCount(picked.length + 1)}.`, "win");
    }

    round.selectedHandId = null;
    round.selectedTableIds.clear();
    render();
    afterTurn();
  }

  function capture(owner, card, tableCards) {
    const round = match.round;
    const ids = new Set(tableCards.map((item) => item.id));
    round.table = round.table.filter((item) => !ids.has(item.id));
    round.captures[owner].push(card, ...tableCards);
    round.lastCapture = owner;
    const hasSettebelloCapture = owner === "player" && [card, ...tableCards].some((item) => item.suit === "denari" && item.value === 7);
    const madeScopa = round.table.length === 0 && (round.deck.length > 0 || round.playerHand.length > 0 || round.botHand.length > 0);
    if (madeScopa) {
      round.scope[owner] += 1;
      sound.play("scopa");
      voice.play(owner === "player" ? "scopaPlayer" : "scopaBot");
      showScopaCelebration(owner);
      triggerScopaImpact();
      if (owner === "player") round.nextBotDelay = Math.max(round.nextBotDelay, 3000);
    }
    if (hasSettebelloCapture) {
      round.nextBotDelay = Math.max(round.nextBotDelay, madeScopa ? 3500 : 2200);
      triggerRareImpact("settebello");
      voice.play("settebello", madeScopa ? 1000 : 0);
    }
  }

  function afterTurn() {
    const round = match.round;
    if (round.playerHand.length === 0 && round.botHand.length === 0) {
      if (round.deck.length > 0) dealHands();
      else return endRound();
    }

    const delay = round.nextBotDelay || 650;
    round.nextBotDelay = 650;
    round.turn = "bot";
    setTimeout(botTurn, delay);
  }

  function dealHands() {
    const round = match.round;
    round.playerHand = round.deck.splice(0, 3);
    round.botHand = round.deck.splice(0, 3);
    sound.play("deal");
    setStatus("Новая сдача. Ваш ход.", "");
    round.turn = "player";
    preloadRoundImages();
    render();
  }

  function botTurn() {
    const round = match.round;
    if (round.ended) return;
    const move = chooseBotMove();
    const card = removeById(round.botHand, move.card.id);

    if (move.capture.length > 0) {
      capture("bot", card, move.capture);
      sound.play("capture");
      setStatus(`Бот сыграл ${displayCard(card)} и взял ${formatCardCount(move.capture.length)}.`, "warn");
    } else {
      round.table.push(card);
      sound.play("place");
      setStatus(`Бот положил ${displayCard(card)}. Ваш ход.`, "");
    }

    if (round.playerHand.length === 0 && round.botHand.length === 0) {
      if (round.deck.length > 0) dealHands();
      else return endRound();
    } else {
      round.turn = "player";
    }
    render();
  }

  function chooseBotMove() {
    const round = match.round;
    const moves = [];
    for (const card of round.botHand) {
      const captures = captureOptions(card, round.table);
      if (captures.length === 0) {
        moves.push({ card, capture: [], score: discardScore(card) });
      } else {
        for (const captureSet of captures) {
          moves.push({ card, capture: captureSet, score: botScoreMove(card, captureSet, round.table.length) });
        }
      }
    }
    moves.sort((a, b) => b.score - a.score);
    return moves[0];
  }

  function captureOptions(card, table) {
    const results = [];
    const exact = table.filter((tableCard) => tableCard.value === card.value);
    if (exact.length > 0) return exact.map((tableCard) => [tableCard]);

    const total = 1 << table.length;
    for (let mask = 1; mask < total; mask += 1) {
      const set = [];
      for (let i = 0; i < table.length; i += 1) {
        if (mask & (1 << i)) set.push(table[i]);
      }
      if (sumCards(set) === card.value) results.push(set);
    }
    return results;
  }

  function botScoreMove(card, captureSet, tableSize) {
    const cards = [card, ...captureSet];
    let score = cards.length * 2;
    if (cards.some((item) => item.suit === "denari")) score += 4;
    if (cards.some((item) => item.suit === "denari" && item.value === 7)) score += 20;
    if (captureSet.length === tableSize) score += 9;
    score += cards.reduce((sum, item) => sum + (primiera[item.rank] || 0) / 10, 0);
    return score;
  }

  function discardScore(card) {
    let score = -card.value;
    if (card.suit === "denari") score -= 3;
    if (card.suit === "denari" && card.value === 7) score -= 30;
    return score;
  }

  function endRound() {
    const round = match.round;
    if (round.lastCapture && round.table.length > 0) {
      round.captures[round.lastCapture].push(...round.table);
      round.table = [];
    }
    round.ended = true;
    const result = scoreRound(round);
    match.scores.player += result.player.total;
    match.scores.bot += result.bot.total;
    const isMatchOver = match.scores.player >= 11 || match.scores.bot >= 11;
    showRoundPanel(result, isMatchOver);
    if (isMatchOver && match.scores.player > match.scores.bot) {
      sound.play("victory");
      showScopaCelebration("victory");
      triggerRareImpact("victory");
      voice.play("matchWinPlayer", 800);
    } else {
      sound.play("round");
      if (isMatchOver) voice.play("matchLosePlayer", 800);
      else if (result.player.total > result.bot.total) voice.play("roundWinPlayer", 600);
      else if (result.bot.total > result.player.total) voice.play("roundWinBot", 600);
    }
    setStatus(match.scores.player >= 11 || match.scores.bot >= 11 ? "Матч завершен. Можно начать новый." : "Раунд завершен.", "win");
    render();
  }

  function scoreRound(round) {
    const player = scoreBase(round.captures.player, round.scope.player);
    const bot = scoreBase(round.captures.bot, round.scope.bot);

    if (round.captures.player.length > round.captures.bot.length) player.cards = 1;
    else if (round.captures.bot.length > round.captures.player.length) bot.cards = 1;

    const playerDenari = round.captures.player.filter((card) => card.suit === "denari").length;
    const botDenari = round.captures.bot.filter((card) => card.suit === "denari").length;
    if (playerDenari > botDenari) player.denari = 1;
    else if (botDenari > playerDenari) bot.denari = 1;

    if (hasSettebello(round.captures.player)) player.settebello = 1;
    if (hasSettebello(round.captures.bot)) bot.settebello = 1;

    const playerPrimiera = primieraTotal(round.captures.player);
    const botPrimiera = primieraTotal(round.captures.bot);
    if (playerPrimiera > botPrimiera) player.primiera = 1;
    else if (botPrimiera > playerPrimiera) bot.primiera = 1;

    player.total = player.cards + player.denari + player.settebello + player.primiera + player.scopa;
    bot.total = bot.cards + bot.denari + bot.settebello + bot.primiera + bot.scopa;
    player.primieraValue = playerPrimiera;
    bot.primieraValue = botPrimiera;
    player.cardCount = round.captures.player.length;
    bot.cardCount = round.captures.bot.length;
    player.denariCount = playerDenari;
    bot.denariCount = botDenari;
    return { player, bot };
  }

  function scoreBase(cards, scopa) {
    return { cards: 0, denari: 0, settebello: 0, primiera: 0, scopa };
  }

  function hasSettebello(cards) {
    return cards.some((card) => card.suit === "denari" && card.value === 7);
  }

  function primieraTotal(cards) {
    let total = 0;
    for (const suit of suits) {
      const best = cards
        .filter((card) => card.suit === suit.id)
        .reduce((max, card) => Math.max(max, primiera[card.rank] || 0), 0);
      total += best;
    }
    return total;
  }

  function showRoundPanel(result, isMatchOver) {
    const rows = [
      ["Карт больше", result.player.cards, result.bot.cards],
      [`Пентакли (${result.player.denariCount}:${result.bot.denariCount})`, result.player.denari, result.bot.denari],
      ["Сеттебелло (7 пентаклей)", result.player.settebello, result.bot.settebello],
      [`Примьера раунда (${result.player.primieraValue}:${result.bot.primieraValue})`, result.player.primiera, result.bot.primiera],
      ["Скопа", result.player.scopa, result.bot.scopa],
      ["Итого за раунд", result.player.total, result.bot.total, "total"]
    ];
    roundPanel.classList.toggle("match-result", isMatchOver);
    roundPanel.querySelector("h2").textContent = isMatchOver
      ? (match.scores.player > match.scores.bot ? "Вы выиграли!" : "Вы проиграли")
      : `Раунд ${match.roundNumber} завершен`;
    const playerLeft = Math.max(0, 11 - match.scores.player);
    const botLeft = Math.max(0, 11 - match.scores.bot);
    const roundSummary = isMatchOver
      ? `<div class="match-summary"><span>Итоговый счет</span><strong>${match.scores.player}:${match.scores.bot}</strong></div>`
      : `<div class="match-summary"><span>Счет матча</span><strong>${match.scores.player}:${match.scores.bot}</strong><em>До победы: вам — ${playerLeft}, боту — ${botLeft}</em></div>`;
    roundBreakdown.innerHTML = isMatchOver
      ? `${roundSummary}<span class="round-head-spacer"></span><strong class="round-player-head">Вы</strong><strong class="round-bot-head">Бот</strong>`
      : `${roundSummary}<span class="round-head-spacer"></span><strong class="round-player-head">Вы</strong><strong class="round-bot-head">Бот</strong>`;
    for (const [label, player, bot, kind] of rows) {
      const labelClass = kind === "total" ? "round-label round-total-label" : "round-label";
      const playerClass = kind === "total" ? "round-score-value round-player-value round-total-value" : "round-score-value round-player-value";
      const botClass = kind === "total" ? "round-score-value round-bot-value round-total-value" : "round-score-value round-bot-value";
      roundBreakdown.insertAdjacentHTML("beforeend", `<span class="${labelClass}">${label}</span><span class="${playerClass}">${player}</span><span class="${botClass}">${bot}</span>`);
    }
    roundBreakdown.insertAdjacentHTML("beforeend", `
      <div class="score-note">Числа в скобках — данные за этот раунд: количество пентаклей и сумма примьеры.</div>
      <div class="development-note">
        <strong>Игра находится в разработке</strong>
        <span>Мы хотим добавить онлайн-режим и приватные партии с друзьями прямо в Telegram.</span>
        <a class="support-link" href="${DONATE_URL}" target="_blank" rel="noopener">Поддержать разработку</a>
      </div>
    `);
    nextRoundButton.textContent = isMatchOver ? "Новый матч" : "Следующий раунд";
    modalBackdrop.hidden = false;
    roundPanel.hidden = false;
  }

  function sumCards(cards) {
    return cards.reduce((sum, card) => sum + card.value, 0);
  }

  function removeById(cards, id) {
    const index = cards.findIndex((card) => card.id === id);
    if (index === -1) return null;
    return cards.splice(index, 1)[0];
  }

  function displayCard(card) {
    return `«${displayRank(card)} ${suitNamesGenitive[card.suit] || card.suitName.toLowerCase()}»`;
  }

  function clearCardSelectionDom() {
    document.querySelectorAll(".card.selected").forEach((item) => item.classList.remove("selected"));
  }

  function formatCardCount(count) {
    return `${count} ${pluralizeRu(count, "карту", "карты", "карт")}`;
  }

  function pluralizeRu(count, one, few, many) {
    const mod10 = Math.abs(count) % 10;
    const mod100 = Math.abs(count) % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function setStatus(text, mode) {
    statusText.textContent = text;
    statusText.className = `status${mode ? ` ${mode}` : ""}`;
  }

  function triggerHaptic(kind) {
    if (!audioSettings.vibrationEnabled) return;
    if (kind === "capture") {
      if (navigator.vibrate) navigator.vibrate(35);
      if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
      return;
    }
    if (kind === "error") {
      if (navigator.vibrate) navigator.vibrate([50, 40, 80]);
      if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("error");
    }
  }

  function triggerRareImpact(kind) {
    if (!audioSettings.vibrationEnabled) return;
    if (kind === "settebello") {
      if (navigator.vibrate) navigator.vibrate([90, 70, 140]);
      if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred("medium");
        window.setTimeout(() => tg.HapticFeedback.notificationOccurred("success"), 150);
      }
      return;
    }
    if (kind === "victory") {
      if (navigator.vibrate) navigator.vibrate([120, 60, 160, 80, 220]);
      if (tg && tg.HapticFeedback) {
        [0, 170, 380, 650].forEach((delay) => {
          window.setTimeout(() => tg.HapticFeedback.impactOccurred("heavy"), delay);
        });
      }
    }
  }

  function hideLoading() {
    window.setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 650);
  }

  function loadAudioSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem("scopaAudioSettings") || "{}");
      const migratedSavedDefaults = saved.settingsVersion !== AUDIO_SETTINGS_VERSION
        && saved.musicVolume === LEGACY_DEFAULT_AUDIO_SETTINGS.musicVolume
        && saved.voiceVolume === LEGACY_DEFAULT_AUDIO_SETTINGS.voiceVolume
        && saved.sfxVolume === LEGACY_DEFAULT_AUDIO_SETTINGS.sfxVolume;
      const migratedPreviousDefaults = saved.settingsVersion !== AUDIO_SETTINGS_VERSION
        && saved.musicVolume === 18
        && saved.voiceVolume === 100
        && saved.sfxVolume === 85;
      const migratedBoostDefaults = saved.settingsVersion !== AUDIO_SETTINGS_VERSION
        && saved.musicVolume === 18
        && saved.voiceVolume === 130
        && saved.sfxVolume === 100;
      if (migratedSavedDefaults || migratedPreviousDefaults || migratedBoostDefaults) {
        return { ...DEFAULT_AUDIO_SETTINGS, settingsVersion: AUDIO_SETTINGS_VERSION };
      }
      return {
        musicVolume: clampVolume(saved.musicVolume ?? DEFAULT_AUDIO_SETTINGS.musicVolume, "musicVolume"),
        voiceVolume: clampVolume(saved.voiceVolume ?? DEFAULT_AUDIO_SETTINGS.voiceVolume, "voiceVolume"),
        sfxVolume: clampVolume(saved.sfxVolume ?? DEFAULT_AUDIO_SETTINGS.sfxVolume, "sfxVolume"),
        vibrationEnabled: saved.vibrationEnabled ?? DEFAULT_AUDIO_SETTINGS.vibrationEnabled,
        settingsVersion: AUDIO_SETTINGS_VERSION
      };
    } catch (error) {
      return { ...DEFAULT_AUDIO_SETTINGS, settingsVersion: AUDIO_SETTINGS_VERSION };
    }
  }

  function saveAudioSettings() {
    localStorage.setItem("scopaAudioSettings", JSON.stringify(audioSettings));
  }

  function clampVolume(value, kind = "musicVolume") {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    const max = VOLUME_LIMITS[kind] || 100;
    return Math.max(0, Math.min(max, Math.round(number)));
  }

  function syncVolumeControls() {
    musicVolume.max = String(VOLUME_LIMITS.musicVolume);
    voiceVolume.max = String(VOLUME_LIMITS.voiceVolume);
    sfxVolume.max = String(VOLUME_LIMITS.sfxVolume);
    musicVolume.value = String(audioSettings.musicVolume);
    voiceVolume.value = String(audioSettings.voiceVolume);
    sfxVolume.value = String(audioSettings.sfxVolume);
    vibrationToggle.checked = Boolean(audioSettings.vibrationEnabled);
    musicVolumeValue.textContent = `${audioSettings.musicVolume}%`;
    voiceVolumeValue.textContent = `${audioSettings.voiceVolume}%`;
    sfxVolumeValue.textContent = `${audioSettings.sfxVolume}%`;
  }

  function updateVolume(kind, value) {
    const volume = clampVolume(value, kind);
    audioSettings[kind] = volume;
    if (kind === "musicVolume") music.setVolume(volume);
    if (kind === "voiceVolume") voice.setVolume(volume);
    if (kind === "sfxVolume") sound.setVolume(volume);
    syncVolumeControls();
    saveAudioSettings();
  }

  function bindVolumeControl(input, kind) {
    const update = () => updateVolume(kind, input.value);
    input.addEventListener("input", update);
    input.addEventListener("change", update);
  }

  function updateVibration(enabled) {
    audioSettings.vibrationEnabled = Boolean(enabled);
    saveAudioSettings();
  }

  function showScopaCelebration(owner) {
    const colors = ["#f1bd4d", "#fff2bd", "#e85151", "#4db6ff", "#65df8f", "#b98cff"];
    const isVictory = owner === "victory";
    scopaCelebrationText.textContent = isVictory ? "Победа в матче" : (owner === "player" ? "Ваша Скопа" : "Скопа у бота");
    confettiLayer.innerHTML = "";

    for (let i = 0; i < (isVictory ? 58 : 34); i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--fall-x", `${Math.round((Math.random() - 0.5) * 180)}px`);
      piece.style.setProperty("--fall-rotate", `${Math.round(360 + Math.random() * 620)}deg`);
      piece.style.setProperty("--fall-duration", `${(isVictory ? 2300 : 1800) + Math.round(Math.random() * 900)}ms`);
      piece.style.animationDelay = `${Math.round(Math.random() * (isVictory ? 760 : 520))}ms`;
      confettiLayer.appendChild(piece);
    }

    scopaCelebration.hidden = false;
    window.clearTimeout(showScopaCelebration.hideTimer);
    showScopaCelebration.hideTimer = window.setTimeout(() => {
      scopaCelebration.hidden = true;
      confettiLayer.innerHTML = "";
    }, isVictory ? 3900 : 3000);
  }

  function triggerScopaImpact() {
    appShell.classList.remove("shake");
    void appShell.offsetWidth;
    appShell.classList.add("shake");
    window.setTimeout(() => appShell.classList.remove("shake"), 950);

    if (!audioSettings.vibrationEnabled) return;
    if (navigator.vibrate) navigator.vibrate([80, 60, 90, 70, 120, 80, 160]);
    if (tg && tg.HapticFeedback) {
      const pulses = [0, 140, 300, 500, 760];
      for (const delay of pulses) {
        window.setTimeout(() => tg.HapticFeedback.impactOccurred("heavy"), delay);
      }
    }
  }

  function createSoundEngine(initialVolume) {
    let context = null;
    let unlocked = false;
    let volume = volumeToLevel(initialVolume, "sfxVolume");

    function ensureContext() {
      if (!context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;
        context = new AudioContext();
      }
      if (context.state === "suspended") context.resume();
      return context;
    }

    function unlock() {
      unlocked = true;
      ensureContext();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    }

    function tone(freq, start, duration, type, gainValue) {
      const audio = ensureContext();
      if (!audio || !unlocked || volume <= 0) return;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, audio.currentTime + start);
      gain.gain.setValueAtTime(0.0001, audio.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, (gainValue || 0.07) * volume), audio.currentTime + start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(audio.currentTime + start);
      osc.stop(audio.currentTime + start + duration + 0.02);
    }

    function play(name) {
      const patterns = {
        tap: [[620, 0, 0.045, "sine", 0.028], [820, 0.035, 0.035, "triangle", 0.018]],
        place: [[220, 0, 0.06, "square", 0.035], [165, 0.045, 0.08, "triangle", 0.025]],
        capture: [[420, 0, 0.06, "triangle", 0.045], [640, 0.055, 0.08, "sine", 0.055]],
        scopa: [[523, 0, 0.08, "triangle", 0.045], [659, 0.07, 0.08, "triangle", 0.05], [784, 0.14, 0.12, "sine", 0.06]],
        warn: [[140, 0, 0.1, "sawtooth", 0.035]],
        deal: [[190, 0, 0.035, "sawtooth", 0.018], [260, 0.035, 0.04, "triangle", 0.02], [190, 0.08, 0.035, "sawtooth", 0.018], [300, 0.115, 0.045, "triangle", 0.02]],
        round: [[330, 0, 0.09, "sine", 0.04], [440, 0.08, 0.1, "sine", 0.04], [550, 0.17, 0.14, "sine", 0.045]],
        victory: [[392, 0, 0.09, "triangle", 0.045], [523, 0.08, 0.11, "triangle", 0.055], [659, 0.18, 0.13, "sine", 0.06], [784, 0.31, 0.2, "sine", 0.065]]
      };
      for (const args of patterns[name] || []) tone(...args);
    }

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    function setVolume(nextVolume) {
      volume = volumeToLevel(nextVolume, "sfxVolume");
    }

    return { play, setVolume };
  }

  function createMusicPlayer(tracks, initialVolume) {
    let index = 0;
    let enabled = false;
    let ducked = false;
    let restoreTimer = null;
    let baseVolume = volumeToLevel(initialVolume);
    const audio = new Audio(tracks[index]);
    const gainController = createMediaGainController([audio], baseVolume);
    audio.preload = "auto";
    applyMusicVolume();

    audio.addEventListener("ended", () => {
      index = (index + 1) % tracks.length;
      audio.src = tracks[index];
      if (enabled) audio.play().catch(() => {});
    });

    async function toggle() {
      enabled = !enabled;
      if (!enabled) {
        audio.pause();
        return false;
      }

      try {
        gainController.resume();
        await audio.play();
        return true;
      } catch (error) {
        enabled = false;
        return false;
      }
    }

    function setVolume(nextVolume) {
      baseVolume = volumeToLevel(nextVolume);
      applyMusicVolume();
    }

    function duck(duration = 0) {
      ducked = true;
      applyMusicVolume();
      window.clearTimeout(restoreTimer);
      if (duration > 0) restoreTimer = window.setTimeout(restore, duration);
    }

    function restore() {
      ducked = false;
      applyMusicVolume();
      window.clearTimeout(restoreTimer);
    }

    function applyMusicVolume() {
      const nextVolume = ducked ? baseVolume * 0.25 : baseVolume;
      gainController.setVolume(nextVolume);
      audio.volume = Math.max(0, Math.min(1, nextVolume));
      audio.muted = baseVolume <= 0;
    }

    return { toggle, setVolume, duck, restore };
  }

  function createVoicePlayer(clips, initialVolume, hooks = {}) {
    const audios = {};
    let pendingTimer = null;
    let playId = 0;
    let volume = volumeToLevel(initialVolume, "voiceVolume");

    for (const [name, sources] of Object.entries(clips)) {
      const sourceList = Array.isArray(sources) ? sources : [sources];
      audios[name] = sourceList.map((src) => {
        const clip = new Audio(src);
        clip.preload = "none";
        clip.volume = Math.min(1, volume);
        clip.muted = volume <= 0;
        return clip;
      });
    }
    const allClips = Object.values(audios).flat();
    const gainController = createMediaGainController(allClips, volume);

    function stopAll() {
      for (const clip of allClips) {
        clip.pause();
        clip.currentTime = 0;
      }
    }

    function play(name, delay = 0) {
      const variants = audios[name] || [];
      if (!variants.length) return;
      const clip = variants[Math.floor(Math.random() * variants.length)];
      const voiceRun = ++playId;

      window.clearTimeout(pendingTimer);
      pendingTimer = window.setTimeout(() => {
        stopAll();
        gainController.resume();
        gainController.setVolume(volume);
        clip.currentTime = 0;
        clip.volume = Math.min(1, volume);
        clip.muted = volume <= 0;
        hooks.onStart?.();
        clip.onended = () => {
          if (voiceRun === playId) hooks.onEnd?.();
        };
        clip.onerror = () => {
          if (voiceRun === playId) hooks.onEnd?.();
        };
        clip.play().catch(() => {
          if (voiceRun === playId) hooks.onEnd?.();
        });
      }, delay);
    }

    function unlock() {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    }

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    function setVolume(nextVolume) {
      volume = volumeToLevel(nextVolume, "voiceVolume");
      gainController.setVolume(volume);
      for (const clip of allClips) {
        clip.volume = Math.min(1, volume);
        clip.muted = volume <= 0;
      }
    }

    return { play, setVolume };
  }

  function volumeToLevel(value, kind = "musicVolume") {
    const normalized = clampVolume(value, kind) / 50;
    if (normalized <= 0) return 0;
    return normalized;
  }

  function createMediaGainController(elements, initialVolume) {
    let context = null;
    let gain = null;
    let connected = false;
    let currentVolume = Math.max(0, Math.min(2, initialVolume));

    function ensureGraph() {
      if (connected) return true;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;

      try {
        context = context || new AudioContext();
        gain = gain || context.createGain();
        gain.gain.value = currentVolume;
        for (const element of elements) {
          const source = context.createMediaElementSource(element);
          source.connect(gain);
        }
        gain.connect(context.destination);
        connected = true;
        return true;
      } catch (error) {
        return false;
      }
    }

    function resume() {
      if (ensureGraph() && context && context.state === "suspended") context.resume().catch(() => {});
    }

    function setVolume(nextVolume) {
      currentVolume = Math.max(0, Math.min(2, nextVolume));
      if (ensureGraph() && gain) {
        const now = context.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setTargetAtTime(currentVolume, now, 0.025);
      }
    }

    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });

    return { setVolume, resume };
  }

  async function toggleMusicFromButton(button) {
    const playing = await music.toggle();
    musicButton.classList.toggle("active", playing);
    musicButton.classList.toggle("muted", !playing);
    homeSoundButton.classList.toggle("active", playing);
    homeSoundButton.classList.toggle("muted", !playing);
    musicButton.textContent = "\u266b";
    musicButton.setAttribute("aria-label", playing ? "Выключить музыку" : "Включить музыку");
    musicButton.setAttribute("title", playing ? "Выключить музыку" : "Включить музыку");
    button?.setAttribute("aria-label", playing ? "Выключить музыку" : "Включить музыку");
    button?.setAttribute("title", playing ? "Выключить музыку" : "Включить музыку");
  }

  homeSoundButton.classList.add("muted");

  playButton.addEventListener("click", playSelected);
  musicButton.addEventListener("click", () => toggleMusicFromButton(musicButton));
  settingsButton.addEventListener("click", () => {
    sound.play("tap");
    syncVolumeControls();
    settingsPanel.hidden = false;
  });
  closeSettingsButton.addEventListener("click", () => {
    sound.play("tap");
    settingsPanel.hidden = true;
  });
  settingsPanel.addEventListener("click", (event) => {
    if (event.target === settingsPanel) settingsPanel.hidden = true;
  });
  closeDevelopersButton.addEventListener("click", () => {
    sound.play("tap");
    developersPanel.hidden = true;
  });
  developersPanel.addEventListener("click", (event) => {
    if (event.target === developersPanel) developersPanel.hidden = true;
  });
  closeSupportFeatureButton.addEventListener("click", () => {
    sound.play("tap");
    supportFeaturePanel.hidden = true;
  });
  supportFeaturePanel.addEventListener("click", (event) => {
    if (event.target === supportFeaturePanel) supportFeaturePanel.hidden = true;
  });
  bindVolumeControl(musicVolume, "musicVolume");
  bindVolumeControl(voiceVolume, "voiceVolume");
  bindVolumeControl(sfxVolume, "sfxVolume");
  vibrationToggle.addEventListener("change", () => updateVibration(vibrationToggle.checked));
  nextRoundButton.addEventListener("click", () => {
    roundPanel.classList.remove("match-result");
    modalBackdrop.hidden = true;
    if (match.scores.player >= 11 || match.scores.bot >= 11) newMatch();
    else startRound();
  });
  newMatchButton.addEventListener("click", newMatch);
  backHomeButton.addEventListener("click", () => {
    sound.play("tap");
    homeScreen.classList.remove("hidden");
  });
  quickPlayButton.addEventListener("click", () => {
    sound.play("tap");
    homeScreen.classList.add("hidden");
  });
  homeRulesButton?.addEventListener("click", () => {
    sound.play("tap");
    rulesPanel.hidden = false;
  });
  homeSoundButton.addEventListener("click", () => {
    sound.play("tap");
    toggleMusicFromButton(homeSoundButton);
  });
  homeSettingsButton.addEventListener("click", () => {
    sound.play("tap");
    syncVolumeControls();
    settingsPanel.hidden = false;
  });
  homeNewMatchButton?.addEventListener("click", () => {
    newMatch();
    homeScreen.classList.add("hidden");
  });
  homeOnlineButton.addEventListener("click", () => {
    sound.play("tap");
    supportFeaturePanel.hidden = false;
  });
  homeFriendButton.addEventListener("click", () => {
    sound.play("tap");
    supportFeaturePanel.hidden = false;
  });
  homeDevelopersButton.addEventListener("click", () => {
    sound.play("tap");
    developersPanel.hidden = false;
  });
  homeScreen.addEventListener("pointermove", (event) => {
    const rect = homeScreen.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    homeScreen.style.setProperty("--hero-drift-x", `${(x * 18).toFixed(1)}px`);
    homeScreen.style.setProperty("--hero-drift-y", `${(y * 12).toFixed(1)}px`);
  });
  homeScreen.addEventListener("pointerleave", () => {
    homeScreen.style.setProperty("--hero-drift-x", "0px");
    homeScreen.style.setProperty("--hero-drift-y", "0px");
  });
  homeChannelButton.addEventListener("click", (event) => {
    event.preventDefault();
    const popup = window.open(CHANNEL_URL, "_blank", "noopener,noreferrer");
    if (!popup && tg) tg.openTelegramLink(CHANNEL_URL);
  });
  channelButton.addEventListener("click", (event) => {
    event.preventDefault();
    const popup = window.open(CHANNEL_URL, "_blank", "noopener,noreferrer");
    if (!popup && tg) tg.openTelegramLink(CHANNEL_URL);
  });
  donateButton.addEventListener("click", (event) => {
    if (!DONATE_URL) {
      event.preventDefault();
      setStatus("Ссылка для донатов пока не настроена.", "warn");
      return;
    }

    event.preventDefault();
    const popup = window.open(DONATE_URL, "_blank", "noopener,noreferrer");
    if (!popup && tg) tg.openTelegramLink(DONATE_URL);
  });
  rulesButton?.addEventListener("click", () => {
    sound.play("tap");
    rulesPanel.hidden = false;
  });
  topRulesCardButton.addEventListener("click", () => {
    sound.play("tap");
    rulesPanel.hidden = false;
  });
  closeRulesButton.addEventListener("click", () => {
    sound.play("tap");
    rulesPanel.hidden = true;
  });
  rulesPanel.addEventListener("click", (event) => {
    if (event.target === rulesPanel) rulesPanel.hidden = true;
  });
  document.addEventListener("click", (event) => {
    const supportLink = event.target.closest(".support-link");
    if (!supportLink) return;
    event.preventDefault();
    const popup = window.open(DONATE_URL, "_blank", "noopener,noreferrer");
    if (!popup && tg) tg.openTelegramLink(DONATE_URL);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !rulesPanel.hidden) rulesPanel.hidden = true;
    if (event.key === "Escape" && !settingsPanel.hidden) settingsPanel.hidden = true;
  });

  syncVolumeControls();
  newMatch();
})();









