// ── Mock Data (replace with real API calls) ──
const MOCK = {
  current: {
    temp: 27,
    feels: 31,
    desc: '多雲時晴',
    emoji: '⛅',
    humidity: 78,
    rain: 0.2,
    wind: 3.4,
    visibility: 12,
    location: '台北市中正區',
    condition: 'partly-cloudy',
  },
  ai: {
    headline: '下午 3 點後有 70% 機率雷陣雨，建議攜帶雨具。',
    sub: '今天其實不用太擔心上午的天氣，真正要注意的是 17:00–19:00 的雷陣雨。ECMWF 模式顯示雨帶將從西南方移入，持續約 1.5 小時後減弱。',
    confidence: 88,
  },
  sources: [
    { name: '中央氣象署', short: 'CWA', high: 31, low: 23, rain: '60%' },
    { name: 'Apple Weather', short: 'AAPL', high: 33, low: 24, rain: '45%' },
    { name: 'ECMWF', short: 'ECMWF', high: 30, low: 23, rain: '70%' },
  ],
  hourly: [
    { time: '現在', emoji: '⛅', temp: 27, rain: '5%' },
    { time: '13:00', emoji: '🌤', temp: 28, rain: '10%' },
    { time: '14:00', emoji: '🌤', temp: 29, rain: '15%' },
    { time: '15:00', emoji: '⛅', temp: 30, rain: '35%' },
    { time: '16:00', emoji: '🌦', temp: 29, rain: '55%' },
    { time: '17:00', emoji: '⛈', temp: 27, rain: '75%' },
    { time: '18:00', emoji: '⛈', temp: 26, rain: '80%' },
    { time: '19:00', emoji: '🌧', temp: 25, rain: '60%' },
    { time: '20:00', emoji: '🌦', temp: 25, rain: '30%' },
    { time: '21:00', emoji: '🌙', temp: 24, rain: '10%' },
    { time: '22:00', emoji: '🌙', temp: 24, rain: '5%' },
    { time: '23:00', emoji: '🌙', temp: 23, rain: '5%' },
  ],
  rain2h: [2, 1, 0, 0, 1, 3, 8, 18, 35, 52, 68, 72],
  forecast: [
    { day: '今天', emoji: '⛅', low: 23, high: 31, rain: '70%' },
    { day: '明天', emoji: '🌧', low: 22, high: 27, rain: '85%' },
    { day: '週三', emoji: '🌦', low: 23, high: 28, rain: '60%' },
    { day: '週四', emoji: '🌤', low: 24, high: 32, rain: '20%' },
    { day: '週五', emoji: '☀️', low: 25, high: 34, rain: '10%' },
    { day: '週六', emoji: '☀️', low: 26, high: 35, rain: '5%' },
    { day: '週日', emoji: '🌤', low: 25, high: 33, rain: '15%' },
    { day: '下週一', emoji: '⛅', low: 24, high: 31, rain: '30%' },
    { day: '下週二', emoji: '🌦', low: 23, high: 29, rain: '50%' },
    { day: '下週三', emoji: '🌧', low: 22, high: 26, rain: '80%' },
  ],
  aqi: {
    value: 62,
    label: '普通',
    color: '#f77f00',
    pm25: 18,
    o3: 42,
    no2: 15,
  },
  uv: {
    value: 7,
    label: '高量級',
    tip: '建議塗抹防曬乳，\n避免長時間戶外活動',
    color: '#f77f00',
  },
};

// ── Clock ──
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('navTime').textContent = `${h}:${m}`;
}

setInterval(updateClock, 1000);
updateClock();

// ── Hero Date ──
function setHeroDate() {
  const now = new Date();
  const opts = { weekday: 'long', month: 'long', day: 'numeric' };
  document.getElementById('heroDate').textContent = now.toLocaleDateString('zh-TW', opts);
}

// ── Particles ──
function createParticles() {
  const container = document.getElementById('particles');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    const colors = ['#f77f00', '#83c5be', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${color};
      animation-duration: ${Math.random() * 15 + 12}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ── Hero ──
function renderHero() {
  const d = MOCK.current;
  document.getElementById('heroTemp').textContent = d.temp;
  document.getElementById('heroEmoji').textContent = d.emoji;
  document.getElementById('heroDesc').textContent = d.desc;
  document.getElementById('heroFeels').textContent = d.feels;
  document.getElementById('heroLocation').textContent = d.location;
  document.getElementById('statHumidity').textContent = `${d.humidity}%`;
  document.getElementById('statRain').textContent = `${d.rain} mm`;
  document.getElementById('statWind').textContent = `${d.wind} m/s`;
  document.getElementById('statVis').textContent = `${d.visibility} km`;

  // Dynamic hero background based on weather
  const gradients = {
    'partly-cloudy': 'radial-gradient(ellipse at 30% 20%, rgba(247,127,0,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(131,197,190,0.15) 0%, transparent 55%), linear-gradient(180deg, #0a0a0f 0%, #050508 100%)',
    'rain': 'radial-gradient(ellipse at 50% 0%, rgba(131,197,190,0.2) 0%, transparent 60%), linear-gradient(180deg, #050810 0%, #020306 100%)',
    'sunny': 'radial-gradient(ellipse at 30% 10%, rgba(247,127,0,0.35) 0%, transparent 55%), linear-gradient(180deg, #0d0800 0%, #050508 100%)',
  };
  document.querySelector('.hero-bg').style.background = gradients['partly-cloudy'];
}

// ── AI Card ──
function renderAI() {
  const d = MOCK.ai;
  document.getElementById('aiHeadline').textContent = d.headline;
  document.getElementById('aiSub').textContent = d.sub;
  document.getElementById('confValue').textContent = d.confidence;

  setTimeout(() => {
    document.getElementById('confidenceFill').style.width = `${d.confidence}%`;
  }, 300);
}

// ── Rain Chart ──
function renderRainChart() {
  const data = MOCK.rain2h;
  const max = Math.max(...data, 10);
  const chart = document.getElementById('rainChart');
  const timeline = document.getElementById('rainTimeline');

  const now = new Date();
  const labels = [];
  const bars = [];

  data.forEach((val, i) => {
    const t = new Date(now.getTime() + i * 10 * 60 * 1000);
    const label = i % 3 === 0 ? `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}` : '';
    labels.push(label);

    const pct = (val / max) * 100;
    let color = '#83c5be';
    if (val >= 10) color = '#e63946';
    else if (val >= 3) color = '#f77f00';

    const wrap = document.createElement('div');
    wrap.className = 'rain-bar-wrap';

    const bar = document.createElement('div');
    bar.className = 'rain-bar';
    bar.style.cssText = `height:${Math.max(pct, 2)}%; background:${color}; opacity:${0.5 + pct/200};`;
    bar.setAttribute('data-tip', `${val} mm/h`);

    wrap.appendChild(bar);
    bars.push(wrap);
  });

  bars.forEach(b => chart.appendChild(b));
  labels.forEach(l => {
    const span = document.createElement('span');
    span.textContent = l;
    timeline.appendChild(span);
  });
}

// ── Hourly ──
function renderHourly() {
  const container = document.getElementById('hourlyScroll');
  MOCK.hourly.forEach((h, i) => {
    const el = document.createElement('div');
    el.className = 'hourly-item' + (i === 0 ? ' active' : '');
    el.innerHTML = `
      <span class="hourly-time">${h.time}</span>
      <span class="hourly-emoji">${h.emoji}</span>
      <span class="hourly-temp">${h.temp}°</span>
      <span class="hourly-rain">${h.rain}</span>
    `;
    el.addEventListener('click', () => {
      document.querySelectorAll('.hourly-item').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
    });
    container.appendChild(el);
  });
}

// ── Sources ──
function renderSources() {
  const sources = MOCK.sources;
  const highs = sources.map(s => s.high);
  const maxH = Math.max(...highs);
  const minH = Math.min(...highs);

  const grid = document.getElementById('sourcesGrid');
  grid.innerHTML = '';

  sources.forEach(s => {
    const isOptimist = s.high === maxH;
    const isPessimist = s.high === minH;
    const pct = ((s.high - 20) / (40 - 20)) * 100;

    let tag = '<span class="source-tag tag-middle">中間值</span>';
    let extraClass = '';
    if (isOptimist) { tag = '<span class="source-tag tag-optimist">最樂觀 😊</span>'; extraClass = 'best'; }
    else if (isPessimist) { tag = '<span class="source-tag tag-pessimist">最悲觀 ☁️</span>'; extraClass = 'worst'; }

    const card = document.createElement('div');
    card.className = `source-card ${extraClass}`;
    card.innerHTML = `
      <div class="source-name">${s.short}</div>
      <div class="source-temp" style="color:${isOptimist ? 'var(--color-primary)' : isPessimist ? 'var(--color-accent)' : 'var(--color-text)'}">${s.high}°</div>
      ${tag}
      <div style="font-size:11px;color:rgba(255,255,255,0.35)">降雨 ${s.rain}</div>
      <div class="source-bar"><div class="source-bar-fill" style="width:${pct}%"></div></div>
    `;
    grid.appendChild(card);
  });

  document.getElementById('verdictOptimist').textContent = `${maxH}° (${sources.find(s=>s.high===maxH).short})`;
  document.getElementById('verdictPessimist').textContent = `${minH}° (${sources.find(s=>s.high===minH).short})`;
  document.getElementById('verdictSpread').textContent = `${maxH - minH}°C`;
}

// ── 10-day Forecast ──
function renderForecast() {
  const container = document.getElementById('forecastList');
  const allHighs = MOCK.forecast.map(f => f.high);
  const allLows = MOCK.forecast.map(f => f.low);
  const maxTemp = Math.max(...allHighs);
  const minTemp = Math.min(...allLows);
  const range = maxTemp - minTemp;

  MOCK.forecast.forEach(f => {
    const row = document.createElement('div');
    row.className = 'forecast-row';

    const lowPct = ((f.low - minTemp) / range) * 80;
    const highPct = ((f.high - minTemp) / range) * 80;
    const fillLeft = `${lowPct}%`;
    const fillWidth = `${highPct - lowPct}%`;

    row.innerHTML = `
      <div class="forecast-day">${f.day}</div>
      <div class="forecast-emoji">${f.emoji}</div>
      <div class="forecast-bar-wrap">
        <span class="forecast-low">${f.low}°</span>
        <div class="forecast-range-bar">
          <div class="forecast-range-fill" style="left:${fillLeft};width:${fillWidth}"></div>
        </div>
        <span class="forecast-high">${f.high}°</span>
      </div>
      <div class="forecast-rain-prob">${f.rain}</div>
    `;
    container.appendChild(row);
  });
}

// ── AQI ──
function renderAQI() {
  const d = MOCK.aqi;
  document.getElementById('aqiNumber').textContent = d.value;
  document.getElementById('aqiNumber').style.color = d.color;

  const label = document.getElementById('aqiLabel');
  label.textContent = d.label;
  label.style.cssText = `background:${d.color}22;color:${d.color};`;

  const pct = (d.value / 300) * 100;
  const fill = document.getElementById('aqiFill');
  fill.style.background = d.color;
  setTimeout(() => { fill.style.width = `${pct}%`; }, 400);

  const details = document.getElementById('aqiDetails');
  [
    ['PM2.5', `${d.pm25} µg/m³`],
    ['O₃', `${d.o3} ppb`],
    ['NO₂', `${d.no2} ppb`],
  ].forEach(([k, v]) => {
    const row = document.createElement('div');
    row.className = 'aqi-detail-row';
    row.innerHTML = `<span>${k}</span><span>${v}</span>`;
    details.appendChild(row);
  });
}

// ── UV ──
function renderUV() {
  const d = MOCK.uv;
  document.getElementById('uvValue').textContent = d.value;
  document.getElementById('uvValue').style.color = d.color;
  document.getElementById('uvLabel').textContent = d.label;
  document.getElementById('uvLabel').style.color = d.color;
  document.getElementById('uvTip').textContent = d.tip;

  const pct = d.value / 11;
  const arc = document.getElementById('uvArc');
  const totalLen = 157;
  setTimeout(() => {
    arc.style.strokeDashoffset = totalLen * (1 - pct);
    arc.style.transition = 'stroke-dashoffset 1s ease';
  }, 400);
}

// ── Radar ──
function renderRadar() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('radarTime').textContent = `${h}:${m}`;

  const wrap = document.getElementById('radarWrap');
  const img = document.getElementById('radarImg');

  // CWA radar composite image (Taiwan)
  // Using a placeholder SVG radar-like animation as fallback
  img.style.display = 'none';
  wrap.innerHTML = `
    <div class="radar-placeholder">
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%">
            <stop offset="0%" stop-color="#0a2a1a"/>
            <stop offset="100%" stop-color="#020a06"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="200" height="200" fill="url(#radarBg)"/>
        <!-- Grid circles -->
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(131,197,190,0.1)" stroke-width="1"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <!-- Crosshair -->
        <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <!-- Rain blobs -->
        <ellipse cx="85" cy="70" rx="18" ry="12" fill="rgba(131,197,190,0.3)" filter="url(#glow)"/>
        <ellipse cx="120" cy="110" rx="22" ry="15" fill="rgba(247,127,0,0.4)" filter="url(#glow)"/>
        <ellipse cx="75" cy="125" rx="12" ry="8" fill="rgba(230,57,70,0.5)" filter="url(#glow)"/>
        <!-- Sweep line -->
        <line x1="100" y1="100" x2="180" y2="100" stroke="rgba(131,197,190,0.6)" stroke-width="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="3s" repeatCount="indefinite"/>
        </line>
        <!-- Center dot -->
        <circle cx="100" cy="100" r="3" fill="var(--color-accent, #83c5be)"/>
        <!-- Taiwan label -->
        <text x="100" y="165" text-anchor="middle" fill="rgba(131,197,190,0.4)" font-size="8">台灣 雷達回波</text>
      </svg>
    </div>
    <div class="radar-overlay">
      <span class="radar-time" id="radarTime">${h}:${m}</span>
    </div>
  `;
}

// ── Last Update ──
function setLastUpdate() {
  const now = new Date();
  const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('zh-TW', opts);
}

// ── Scroll animation ──
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .source-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ── Hero weather animation tweak ──
function animateHeroTemp() {
  const el = document.getElementById('heroTemp');
  el.style.opacity = '0';
  el.style.transform = 'scale(0.8)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'scale(1)';
  }, 200);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  setHeroDate();
  createParticles();
  renderHero();
  renderAI();
  renderRainChart();
  renderHourly();
  renderSources();
  renderForecast();
  renderAQI();
  renderUV();
  renderRadar();
  setLastUpdate();
  animateHeroTemp();

  setTimeout(initScrollObserver, 100);
});
