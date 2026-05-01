(function () {
  "use strict";

  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg) {
    tg.ready();
    tg.expand();
    document.documentElement.style.setProperty("--bg", tg.themeParams.bg_color || "#123229");
    document.documentElement.style.setProperty("--text", tg.themeParams.text_color || "#f4fbf8");
  }

  const DONATE_URL = "https://t.me/appsmeridian_bot";
  const USE_CARD_IMAGES = true;
  const MUSIC_TRACKS = [
    "./assets/audio/cooking-with-the-italians.mp3",
    "./assets/audio/the-little-cafe.mp3"
  ];
  const sound = createSoundEngine();
  const music = createMusicPlayer(MUSIC_TRACKS);

  const suits = [
    { id: "denari", name: "Пентакли", icon: "●" },
    { id: "coppe", name: "Кубки", icon: "♥" },
    { id: "spade", name: "Мечи", icon: "♠" },
    { id: "bastoni", name: "Жезлы", icon: "♣" }
  ];
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const rankNames = { 1: "Туз", 8: "Валет", 9: "Рыцарь", 10: "Король" };
  const primiera = { 7: 21, 6: 18, 1: 16, 5: 15, 4: 14, 3: 13, 2: 12, 8: 10, 9: 10, 10: 10 };

  const playerScoreEl = document.getElementById("playerScore");
  const botScoreEl = document.getElementById("botScore");
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
  const musicButton = document.getElementById("musicButton");
  const donateButton = document.getElementById("donateButton");
  const rulesButton = document.getElementById("rulesButton");
  const rulesPanel = document.getElementById("rulesPanel");
  const closeRulesButton = document.getElementById("closeRulesButton");
  const loadingScreen = document.getElementById("loadingScreen");

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
    match = { scores: { player: 0, bot: 0 }, round: null };
    startRound();
  }

  function startRound() {
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
      turn: "player",
      ended: false
    };
    roundPanel.hidden = true;
    setStatus("Выберите карту. Для взятки отметьте карты на столе с такой же суммой.", "");
    render();
    hideLoading();
  }

  function render() {
    const round = match.round;
    playerScoreEl.textContent = String(match.scores.player);
    botScoreEl.textContent = String(match.scores.bot);
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
      button.innerHTML = `<img class="card-image" src="${cardImagePath(card)}" alt="">`;
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
    return `./assets/cards/${card.suit}-${card.value}.png`;
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
    const card = removeById(round.playerHand, round.selectedHandId);
    if (!card) return;

    const picked = round.table.filter((tableCard) => round.selectedTableIds.has(tableCard.id));
    const selectedSum = sumCards(picked);
    if (picked.length > 0 && selectedSum !== card.value) {
      round.playerHand.push(card);
      sound.play("warn");
      setStatus(`Сумма выбранных карт ${selectedSum}, нужна ${card.value}.`, "warn");
      render();
      return;
    }

    const exactTableCard = round.table.find((tableCard) => tableCard.value === card.value);
    if (picked.length > 1 && exactTableCard) {
      round.playerHand.push(card);
      sound.play("warn");
      setStatus(`По правилам нужно взять одиночную карту ${displayCard(exactTableCard)}.`, "warn");
      render();
      return;
    }

    if (picked.length === 0 && captureOptions(card, round.table).length > 0) {
      round.playerHand.push(card);
      sound.play("warn");
      setStatus("Эта карта может взять со стола, сбросить ее нельзя.", "warn");
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
      setStatus(`Вы взяли ${picked.length + 1} карт.`, "win");
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
    if (round.table.length === 0 && (round.deck.length > 0 || round.playerHand.length > 0 || round.botHand.length > 0)) {
      round.scope[owner] += 1;
      sound.play("scopa");
      pulseHaptic(owner === "player" ? "success" : "warning");
    }
  }

  function afterTurn() {
    const round = match.round;
    if (round.playerHand.length === 0 && round.botHand.length === 0) {
      if (round.deck.length > 0) dealHands();
      else return endRound();
    }

    round.turn = "bot";
    setTimeout(botTurn, 650);
  }

  function dealHands() {
    const round = match.round;
    round.playerHand = round.deck.splice(0, 3);
    round.botHand = round.deck.splice(0, 3);
    sound.play("deal");
    setStatus("Новая сдача. Ваш ход.", "");
    round.turn = "player";
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
      setStatus(`Бот сыграл ${displayCard(card)} и взял ${move.capture.length} карт.`, "warn");
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
    showRoundPanel(result);
    sound.play("round");
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

  function showRoundPanel(result) {
    const rows = [
      ["Карт больше", result.player.cards, result.bot.cards],
      [`Пентакли (${result.player.denariCount}:${result.bot.denariCount})`, result.player.denari, result.bot.denari],
      ["Сеттебелло", result.player.settebello, result.bot.settebello],
      [`Примьера (${result.player.primieraValue}:${result.bot.primieraValue})`, result.player.primiera, result.bot.primiera],
      ["Scopa", result.player.scopa, result.bot.scopa],
      ["Итого за раунд", result.player.total, result.bot.total]
    ];
    roundBreakdown.innerHTML = "<span></span><strong>Вы</strong><strong>Бот</strong>";
    for (const [label, player, bot] of rows) {
      roundBreakdown.insertAdjacentHTML("beforeend", `<span>${label}</span><span>${player}</span><span>${bot}</span>`);
    }
    nextRoundButton.textContent = match.scores.player >= 11 || match.scores.bot >= 11 ? "Новый матч" : "Следующий раунд";
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
    return `${displayRank(card)} ${card.suitName}`;
  }

  function setStatus(text, mode) {
    statusText.textContent = text;
    statusText.className = `status${mode ? ` ${mode}` : ""}`;
  }

  function pulseHaptic(kind) {
    if (!tg || !tg.HapticFeedback) return;
    if (kind === "success") tg.HapticFeedback.notificationOccurred("success");
    else tg.HapticFeedback.notificationOccurred("warning");
  }

  function hideLoading() {
    window.setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 650);
  }

  function createSoundEngine() {
    let context = null;
    let unlocked = false;

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
      if (!audio || !unlocked) return;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, audio.currentTime + start);
      gain.gain.setValueAtTime(0.0001, audio.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(gainValue || 0.07, audio.currentTime + start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(audio.currentTime + start);
      osc.stop(audio.currentTime + start + duration + 0.02);
    }

    function play(name) {
      const patterns = {
        tap: [[520, 0, 0.055, "triangle", 0.035]],
        place: [[220, 0, 0.06, "square", 0.035], [165, 0.045, 0.08, "triangle", 0.025]],
        capture: [[420, 0, 0.06, "triangle", 0.045], [640, 0.055, 0.08, "sine", 0.055]],
        scopa: [[523, 0, 0.08, "triangle", 0.045], [659, 0.07, 0.08, "triangle", 0.05], [784, 0.14, 0.12, "sine", 0.06]],
        warn: [[140, 0, 0.1, "sawtooth", 0.035]],
        deal: [[260, 0, 0.045, "triangle", 0.025], [300, 0.045, 0.045, "triangle", 0.025], [340, 0.09, 0.05, "triangle", 0.025]],
        round: [[330, 0, 0.09, "sine", 0.04], [440, 0.08, 0.1, "sine", 0.04], [550, 0.17, 0.14, "sine", 0.045]]
      };
      for (const args of patterns[name] || []) tone(...args);
    }

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return { play };
  }

  function createMusicPlayer(tracks) {
    let index = 0;
    let enabled = false;
    const audio = new Audio(tracks[index]);
    audio.preload = "auto";
    audio.volume = 0.28;

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
        await audio.play();
        return true;
      } catch (error) {
        enabled = false;
        return false;
      }
    }

    return { toggle };
  }

  playButton.addEventListener("click", playSelected);
  musicButton.addEventListener("click", async () => {
    const playing = await music.toggle();
    musicButton.classList.toggle("active", playing);
    musicButton.textContent = playing ? "♫" : "♪";
    musicButton.setAttribute("aria-label", playing ? "Выключить музыку" : "Включить музыку");
    musicButton.setAttribute("title", playing ? "Выключить музыку" : "Включить музыку");
  });
  nextRoundButton.addEventListener("click", () => {
    if (match.scores.player >= 11 || match.scores.bot >= 11) newMatch();
    else startRound();
  });
  newMatchButton.addEventListener("click", newMatch);
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
  rulesButton.addEventListener("click", () => {
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
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !rulesPanel.hidden) rulesPanel.hidden = true;
  });

  newMatch();
})();
