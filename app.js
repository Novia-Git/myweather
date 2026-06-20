// ── 台灣地區清單 ──
const TW_LOCATIONS = [
  { name: '台北市', county: '台北市', cwaId: 'F-D0047-061', lat: 25.0330, lon: 121.5654 },
  { name: '新北市', county: '新北市', cwaId: 'F-D0047-069', lat: 25.0120, lon: 121.4650 },
  { name: '基隆市', county: '基隆市', cwaId: 'F-D0047-049', lat: 25.1276, lon: 121.7392 },
  { name: '桃園市', county: '桃園市', cwaId: 'F-D0047-005', lat: 24.9937, lon: 121.3010 },
  { name: '新竹市', county: '新竹市', cwaId: 'F-D0047-053', lat: 24.8036, lon: 120.9686 },
  { name: '新竹縣', county: '新竹縣', cwaId: 'F-D0047-009', lat: 24.8387, lon: 121.0177 },
  { name: '苗栗縣', county: '苗栗縣', cwaId: 'F-D0047-013', lat: 24.5602, lon: 120.8214 },
  { name: '台中市', county: '台中市', cwaId: 'F-D0047-073', lat: 24.1477, lon: 120.6736 },
  { name: '彰化縣', county: '彰化縣', cwaId: 'F-D0047-017', lat: 24.0518, lon: 120.5161 },
  { name: '南投縣', county: '南投縣', cwaId: 'F-D0047-021', lat: 23.9610, lon: 120.9718 },
  { name: '雲林縣', county: '雲林縣', cwaId: 'F-D0047-025', lat: 23.7092, lon: 120.4313 },
  { name: '嘉義市', county: '嘉義市', cwaId: 'F-D0047-057', lat: 23.4800, lon: 120.4491 },
  { name: '嘉義縣', county: '嘉義縣', cwaId: 'F-D0047-029', lat: 23.4518, lon: 120.2554 },
  { name: '台南市', county: '台南市', cwaId: 'F-D0047-077', lat: 22.9998, lon: 120.2269 },
  { name: '高雄市', county: '高雄市', cwaId: 'F-D0047-065', lat: 22.6273, lon: 120.3014 },
  { name: '屏東縣', county: '屏東縣', cwaId: 'F-D0047-033', lat: 22.5519, lon: 120.5487 },
  { name: '宜蘭縣', county: '宜蘭縣', cwaId: 'F-D0047-001', lat: 24.7021, lon: 121.7377 },
  { name: '花蓮縣', county: '花蓮縣', cwaId: 'F-D0047-041', lat: 23.9871, lon: 121.6015 },
  { name: '台東縣', county: '台東縣', cwaId: 'F-D0047-037', lat: 22.7583, lon: 121.1444 },
  { name: '澎湖縣', county: '澎湖縣', cwaId: 'F-D0047-045', lat: 23.5711, lon: 119.5793 },
  { name: '金門縣', county: '金門縣', cwaId: 'F-D0047-085', lat: 24.4493, lon: 118.3765 },
  { name: '連江縣', county: '連江縣', cwaId: 'F-D0047-089', lat: 26.1605, lon: 119.9512 },
];

// ── 狀態 ──
let currentLocation = TW_LOCATIONS[0];
let CWA_API_KEY = localStorage.getItem('cwa_api_key') || '';

// ── API 設定 ──
const CWA_BASE = 'https://opendata.cwa.gov.tw/api';

// ── Mock Data（無 API Key 時使用）──
const MOCK = {
  current: {
    temp: 27, feels: 31, desc: '多雲時晴', emoji: '⛅',
    humidity: 78, rain: 0.2, wind: 3.4, visibility: 12,
    condition: 'partly-cloudy',
  },
  ai: {
    headline: '下午 3 點後有 70% 機率雷陣雨，建議攜帶雨具。',
    sub: '今天其實不用太擔心上午的天氣，真正要注意的是 17:00–19:00 的雷陣雨。ECMWF 模式顯示雨帶將從西南方移入，持續約 1.5 小時後減弱。',
    confidence: 88,
  },
  sources: [
    { name: '中央氣象署', short: 'CWA',   high: 31, low: 23, rain: '60%' },
    { name: 'Open-Meteo', short: 'OM',    high: 33, low: 24, rain: '45%' },
    { name: 'ECMWF',      short: 'ECMWF', high: 30, low: 23, rain: '70%' },
  ],
  hourly: [
    { time: '現在',   emoji: '⛅', temp: 27, rain: '5%'  },
    { time: '13:00',  emoji: '🌤', temp: 28, rain: '10%' },
    { time: '14:00',  emoji: '🌤', temp: 29, rain: '15%' },
    { time: '15:00',  emoji: '⛅', temp: 30, rain: '35%' },
    { time: '16:00',  emoji: '🌦', temp: 29, rain: '55%' },
    { time: '17:00',  emoji: '⛈', temp: 27, rain: '75%' },
    { time: '18:00',  emoji: '⛈', temp: 26, rain: '80%' },
    { time: '19:00',  emoji: '🌧', temp: 25, rain: '60%' },
    { time: '20:00',  emoji: '🌦', temp: 25, rain: '30%' },
    { time: '21:00',  emoji: '🌙', temp: 24, rain: '10%' },
    { time: '22:00',  emoji: '🌙', temp: 24, rain: '5%'  },
    { time: '23:00',  emoji: '🌙', temp: 23, rain: '5%'  },
  ],
  rain2h: [2, 1, 0, 0, 1, 3, 8, 18, 35, 52, 68, 72],
  forecast: [
    { day: '今天',   emoji: '⛅', low: 23, high: 31, rain: '70%' },
    { day: '明天',   emoji: '🌧', low: 22, high: 27, rain: '85%' },
    { day: '週三',   emoji: '🌦', low: 23, high: 28, rain: '60%' },
    { day: '週四',   emoji: '🌤', low: 24, high: 32, rain: '20%' },
    { day: '週五',   emoji: '☀️', low: 25, high: 34, rain: '10%' },
    { day: '週六',   emoji: '☀️', low: 26, high: 35, rain: '5%'  },
    { day: '週日',   emoji: '🌤', low: 25, high: 33, rain: '15%' },
    { day: '下週一', emoji: '⛅', low: 24, high: 31, rain: '30%' },
    { day: '下週二', emoji: '🌦', low: 23, high: 29, rain: '50%' },
    { day: '下週三', emoji: '🌧', low: 22, high: 26, rain: '80%' },
  ],
  aqi:  { value: 62,  label: '普通',  color: '#f77f00', pm25: 18, o3: 42, no2: 15 },
  uv:   { value: 7,   label: '高量級', tip: '建議塗抹防曬乳，\n避免長時間戶外活動', color: '#f77f00' },
};

// ── CWA API 工具函式 ──
function cwaUrl(path, params = {}) {
  const q = new URLSearchParams({ Authorization: CWA_API_KEY, format: 'JSON', ...params });
  return `${CWA_BASE}${path}?${q}`;
}

// 天氣描述 → emoji
function descToEmoji(desc = '') {
  if (!desc) return '🌡';
  if (desc.includes('晴'))    return desc.includes('雲') ? '🌤' : '☀️';
  if (desc.includes('雷'))    return '⛈';
  if (desc.includes('大雨') || desc.includes('豪雨')) return '🌧';
  if (desc.includes('雨'))    return desc.includes('陣') ? '🌦' : '🌧';
  if (desc.includes('陰'))    return '☁️';
  if (desc.includes('多雲'))  return '⛅';
  if (desc.includes('霧'))    return '🌫';
  return '⛅';
}

// CWA 天氣描述 → 背景類型
function descToCondition(desc = '') {
  if (desc.includes('雨') || desc.includes('雷')) return 'rain';
  if (desc.includes('晴') && !desc.includes('雲'))  return 'sunny';
  return 'partly-cloudy';
}

// ── 抓 CWA 即時觀測（O-A0003-001）──
async function fetchCWACurrent(loc) {
  const url = cwaUrl('/v1/rest/datastore/O-A0003-001', {
    CountyName: loc.county,
    limit: 3,
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CWA HTTP ${res.status}`);
  const json = await res.json();
  const station = json?.records?.Station?.[0];
  if (!station) throw new Error('no station data');

  const w       = station.WeatherElement;
  const temp    = parseFloat(w.AirTemperature);
  const humidity= parseFloat(w.RelativeHumidity);
  const wind    = parseFloat(w.WindSpeed);
  const rain    = parseFloat(w.Now?.Precipitation ?? 0);
  const desc    = w.Weather || '多雲時晴';

  if (isNaN(temp)) throw new Error('invalid temp');

  return {
    temp:       Math.round(temp),
    feels:      Math.round(temp + (humidity > 70 ? 2 : 0)),
    desc,
    emoji:      descToEmoji(desc),
    humidity:   isNaN(humidity) ? 70 : Math.round(humidity),
    rain:       isNaN(rain) ? 0 : rain,
    wind:       isNaN(wind) ? 0 : wind,
    visibility: 10,
    condition:  descToCondition(desc),
    stationName: station.StationName,
  };
}

// ── 抓 CWA 36小時預報（F-C0032-001）──
async function fetchCWAForecast36(loc) {
  const url = cwaUrl('/v1/rest/datastore/F-C0032-001', {
    locationName: loc.county,
  });
  const res = await fetch(url);
  const json = await res.json();
  const location = json?.records?.location?.[0];
  if (!location) throw new Error('no forecast');

  const elements = {};
  location.weatherElement.forEach(el => { elements[el.elementName] = el.time; });

  // 取最近6個時段
  const times = elements['Wx'] || [];
  const hourly = times.slice(0, 6).map((t, i) => {
    const desc = t.parameter?.parameterName || '';
    const temp = elements['MaxT']?.[i]?.parameter?.parameterName;
    const rain = elements['PoP']?.[i]?.parameter?.parameterName;
    const hour = new Date(t.startTime);
    return {
      time: i === 0 ? '現在' : `${String(hour.getHours()).padStart(2,'0')}:00`,
      emoji: descToEmoji(desc),
      temp: parseInt(temp) || '--',
      rain: `${rain || '--'}%`,
    };
  });

  const days = {};
  times.forEach((t, i) => {
    const d = new Date(t.startTime);
    const key = d.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
    if (!days[key]) {
      const desc = t.parameter?.parameterName || '';
      const maxT = elements['MaxT']?.[i]?.parameter?.parameterName;
      const minT = elements['MinT']?.[i]?.parameter?.parameterName;
      const rain = elements['PoP']?.[i]?.parameter?.parameterName;
      days[key] = {
        day: Object.keys(days).length === 0 ? '今天' : Object.keys(days).length === 1 ? '明天' : key,
        emoji: descToEmoji(desc),
        high: parseInt(maxT) || '--',
        low:  parseInt(minT) || '--',
        rain: `${rain || '--'}%`,
      };
    }
  });

  return { hourly, forecast: Object.values(days) };
}

// ── 抓 Open-Meteo（免費，不需 API Key）──
async function fetchOpenMeteo(loc) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code,visibility&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FTaipei&forecast_days=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
  return res.json();
}

// WMO 天氣代碼 → emoji
function wmoToEmoji(code) {
  if (code === 0)             return '☀️';
  if (code <= 2)              return '🌤';
  if (code === 3)             return '☁️';
  if (code <= 49)             return '🌫';
  if (code <= 57)             return '🌧';
  if (code <= 67)             return '🌧';
  if (code <= 77)             return '❄️';
  if (code <= 82)             return '🌦';
  if (code <= 86)             return '🌨';
  return '⛈';
}

// WMO 代碼 → 描述
function wmoToDesc(code) {
  const map = {
    0:'晴天', 1:'大致晴朗', 2:'多雲時晴', 3:'陰天',
    45:'霧',  48:'霧淞',
    51:'毛毛雨', 53:'毛毛雨', 55:'毛毛雨',
    61:'小雨', 63:'中雨', 65:'大雨',
    80:'陣雨', 81:'陣雨', 82:'強陣雨',
    95:'雷陣雨', 96:'雷陣雨', 99:'強雷陣雨',
  };
  return map[code] || '多雲時晴';
}

// ── 組合資料並渲染 ──
async function loadWeather(loc) {
  showLoading(true);

  try {
    // Open-Meteo 永遠先抓（依真實 lat/lon，每個城市不同）
    const omData = await fetchOpenMeteo(loc);

    // CWA 只在有 API Key 時嘗試，失敗不影響主流程
    const cwaCurrent  = CWA_API_KEY ? await fetchCWACurrent(loc).catch(() => null)   : null;
    const cwaForecast = CWA_API_KEY ? await fetchCWAForecast36(loc).catch(() => null) : null;

    // ── 即時天氣（CWA 優先，否則 Open-Meteo）──
    let current;
    if (cwaCurrent) {
      current = { ...cwaCurrent, location: `${loc.county} ${cwaCurrent.stationName}` };
    } else {
      const c    = omData.current;
      const code = c.weather_code ?? omData.daily.weather_code?.[0] ?? 0;
      current = {
        temp:       Math.round(c.temperature_2m),
        feels:      Math.round(c.apparent_temperature ?? c.temperature_2m),
        desc:       wmoToDesc(code),
        emoji:      wmoToEmoji(code),
        humidity:   Math.round(c.relative_humidity_2m),
        rain:       Math.round((c.precipitation ?? 0) * 10) / 10,
        wind:       Math.round((c.wind_speed_10m ?? 0) / 3.6 * 10) / 10,
        visibility: Math.round((c.visibility ?? 10000) / 1000),
        condition:  code === 0 ? 'sunny' : code >= 60 ? 'rain' : 'partly-cloudy',
        location:   loc.name,
      };
    }

    // ── 逐小時（CWA 優先）──
    let hourly;
    if (cwaForecast?.hourly?.length) {
      hourly = cwaForecast.hourly;
    } else {
      const nowH  = new Date().getHours();
      const nowDate = new Date().toISOString().slice(0, 10);
      hourly = omData.hourly.time
        .map((t, i) => {
          const dt   = new Date(t);
          const h    = dt.getHours();
          const date = t.slice(0, 10);
          const code = omData.hourly.weather_code?.[i] ?? 0;
          return {
            _h: h, _date: date,
            time:  `${String(h).padStart(2,'0')}:00`,
            emoji: wmoToEmoji(code),
            temp:  Math.round(omData.hourly.temperature_2m[i]),
            rain:  `${omData.hourly.precipitation_probability?.[i] ?? 0}%`,
          };
        })
        .filter(x => x._date === nowDate && x._h >= nowH)
        .slice(0, 12)
        .map((x, i) => ({ ...x, time: i === 0 ? '現在' : x.time }));
    }

    // ── 10天預報（CWA 優先）──
    let forecast;
    if (cwaForecast?.forecast?.length) {
      forecast = cwaForecast.forecast;
    } else {
      const dayNames = ['日','一','二','三','四','五','六'];
      forecast = omData.daily.time.map((t, i) => {
        const d    = new Date(t + 'T00:00:00');
        const code = omData.daily.weather_code?.[i] ?? 0;
        const label = i === 0 ? '今天' : i === 1 ? '明天' : `週${dayNames[d.getDay()]}`;
        return {
          day:   label,
          emoji: wmoToEmoji(code),
          high:  Math.round(omData.daily.temperature_2m_max[i]),
          low:   Math.round(omData.daily.temperature_2m_min[i]),
          rain:  `${omData.daily.precipitation_probability_max?.[i] ?? 0}%`,
        };
      });
    }

    // ── 多資料源比較 ──
    const omHigh = Math.round(omData.daily.temperature_2m_max[0]);
    const omLow  = Math.round(omData.daily.temperature_2m_min[0]);
    const sources = [
      { name: 'Open-Meteo', short: 'Open-Meteo', high: omHigh, low: omLow, rain: `${omData.daily.precipitation_probability_max?.[0] ?? 0}%` },
    ];
    if (CWA_API_KEY && cwaForecast?.forecast?.[0]) {
      sources.unshift({ name: '中央氣象署', short: 'CWA', high: cwaForecast.forecast[0].high, low: cwaForecast.forecast[0].low, rain: cwaForecast.forecast[0].rain });
    }

    // ── 2小時降雨（Open-Meteo 逐小時插值）──
    const rain2h = omData.hourly.precipitation.slice(0, 12).map(v => Math.round((v ?? 0) * 10) / 10);

    renderAll({ current, hourly, forecast, sources, rain2h, location: loc });

  } catch (err) {
    console.error('載入天氣資料失敗', err);
    // 顯示錯誤提示但仍用 loc 名稱
    renderAll({ ...getMockData(loc), location: loc });
  } finally {
    showLoading(false);
  }
}

function getMockData(loc) {
  return {
    current: { ...MOCK.current, location: loc.name },
    hourly:  MOCK.hourly,
    forecast: MOCK.forecast,
    sources: MOCK.sources,
    rain2h:  MOCK.rain2h,
  };
}

function showLoading(on) {
  document.getElementById('heroTemp').style.opacity = on ? '0.3' : '1';
}

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
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${color};animation-duration:${Math.random()*15+12}s;animation-delay:${Math.random()*10}s;`;
    container.appendChild(p);
  }
}

// ── renderAll ──
function renderAll({ current, hourly, forecast, sources, rain2h, location: loc }) {
  renderHero(current, loc);
  renderAI(current);
  renderRainChart(rain2h);
  renderHourly(hourly);
  renderSources(sources);
  renderForecast(forecast);
  renderAQI(MOCK.aqi);
  renderUV(MOCK.uv);
  renderRadar();
  setLastUpdate();
  animateHeroTemp();
}

// ── Hero ──
function renderHero(d, loc) {
  document.getElementById('heroTemp').textContent   = d.temp;
  document.getElementById('heroEmoji').textContent  = d.emoji;
  document.getElementById('heroDesc').textContent   = d.desc;
  document.getElementById('heroFeels').textContent  = d.feels;
  document.getElementById('heroLocation').textContent = d.location || loc?.name || '台北市';
  document.getElementById('navLocationText').textContent = loc?.name || '台北市';
  document.getElementById('statHumidity').textContent = `${d.humidity}%`;
  document.getElementById('statRain').textContent    = `${d.rain} mm`;
  document.getElementById('statWind').textContent    = `${d.wind} m/s`;
  document.getElementById('statVis').textContent     = `${d.visibility} km`;

  const gradients = {
    'partly-cloudy': 'radial-gradient(ellipse at 30% 20%, rgba(247,127,0,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(131,197,190,0.15) 0%, transparent 55%), linear-gradient(180deg, #0a0a0f 0%, #050508 100%)',
    'rain':   'radial-gradient(ellipse at 50% 0%, rgba(131,197,190,0.2) 0%, transparent 60%), linear-gradient(180deg, #050810 0%, #020306 100%)',
    'sunny':  'radial-gradient(ellipse at 30% 10%, rgba(247,127,0,0.35) 0%, transparent 55%), linear-gradient(180deg, #0d0800 0%, #050508 100%)',
  };
  document.querySelector('.hero-bg').style.background = gradients[d.condition] || gradients['partly-cloudy'];
}

// ── AI Card ──
function renderAI(current) {
  const d = MOCK.ai;
  // 有真實資料時動態調整標題
  if (current && current.temp) {
    document.getElementById('aiHeadline').textContent = `${current.desc}，氣溫 ${current.temp}°C，濕度 ${current.humidity}%。`;
    document.getElementById('aiSub').textContent = `風速 ${current.wind} m/s，能見度 ${current.visibility} km。資料來源：${CWA_API_KEY ? '中央氣象署 + Open-Meteo' : 'Open-Meteo（設定 CWA API Key 可獲得更精確資料）'}`;
  } else {
    document.getElementById('aiHeadline').textContent = d.headline;
    document.getElementById('aiSub').textContent = d.sub;
  }
  document.getElementById('confValue').textContent = d.confidence;
  setTimeout(() => {
    document.getElementById('confidenceFill').style.width = `${d.confidence}%`;
  }, 300);
}

// ── Rain Chart ──
function renderRainChart(data) {
  const max = Math.max(...data, 10);
  const chart = document.getElementById('rainChart');
  const timeline = document.getElementById('rainTimeline');
  chart.innerHTML = '';
  timeline.innerHTML = '';

  const now = new Date();
  data.forEach((val, i) => {
    const t = new Date(now.getTime() + i * 10 * 60 * 1000);
    const label = i % 3 === 0 ? `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}` : '';

    const pct = (val / max) * 100;
    let color = '#83c5be';
    if (val >= 10) color = '#e63946';
    else if (val >= 3) color = '#f77f00';

    const wrap = document.createElement('div');
    wrap.className = 'rain-bar-wrap';
    const bar = document.createElement('div');
    bar.className = 'rain-bar';
    bar.style.cssText = `height:${Math.max(pct,2)}%;background:${color};opacity:${0.5+pct/200};`;
    bar.setAttribute('data-tip', `${val} mm/h`);
    wrap.appendChild(bar);
    chart.appendChild(wrap);

    const span = document.createElement('span');
    span.textContent = label;
    timeline.appendChild(span);
  });
}

// ── Hourly ──
function renderHourly(hourly) {
  const container = document.getElementById('hourlyScroll');
  container.innerHTML = '';
  hourly.forEach((h, i) => {
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
function renderSources(sources) {
  const highs = sources.map(s => s.high).filter(v => typeof v === 'number');
  const maxH = Math.max(...highs);
  const minH = Math.min(...highs);

  const grid = document.getElementById('sourcesGrid');
  grid.innerHTML = '';

  sources.forEach(s => {
    const isOptimist  = s.high === maxH;
    const isPessimist = s.high === minH && sources.length > 1;
    const pct = ((s.high - 20) / (40 - 20)) * 100;

    let tag = '<span class="source-tag tag-middle">中間值</span>';
    let extraClass = '';
    if (isOptimist)  { tag = '<span class="source-tag tag-optimist">最樂觀 😊</span>'; extraClass = 'best'; }
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

  const optName = sources.find(s => s.high === maxH)?.short || '--';
  const pesName = sources.find(s => s.high === minH)?.short || '--';
  document.getElementById('verdictOptimist').textContent  = `${maxH}° (${optName})`;
  document.getElementById('verdictPessimist').textContent = `${minH}° (${pesName})`;
  document.getElementById('verdictSpread').textContent    = `${maxH - minH}°C`;
}

// ── 10-day Forecast ──
function renderForecast(forecastData) {
  const container = document.getElementById('forecastList');
  container.innerHTML = '';
  const allHighs = forecastData.map(f => f.high).filter(v => typeof v === 'number');
  const allLows  = forecastData.map(f => f.low).filter(v => typeof v === 'number');
  const maxTemp  = Math.max(...allHighs);
  const minTemp  = Math.min(...allLows);
  const range    = maxTemp - minTemp || 1;

  forecastData.forEach(f => {
    const row = document.createElement('div');
    row.className = 'forecast-row';
    const lowPct  = ((f.low  - minTemp) / range) * 80;
    const highPct = ((f.high - minTemp) / range) * 80;
    row.innerHTML = `
      <div class="forecast-day">${f.day}</div>
      <div class="forecast-emoji">${f.emoji}</div>
      <div class="forecast-bar-wrap">
        <span class="forecast-low">${f.low}°</span>
        <div class="forecast-range-bar">
          <div class="forecast-range-fill" style="left:${lowPct}%;width:${highPct-lowPct}%"></div>
        </div>
        <span class="forecast-high">${f.high}°</span>
      </div>
      <div class="forecast-rain-prob">${f.rain}</div>
    `;
    container.appendChild(row);
  });
}

// ── AQI ──
function renderAQI(d) {
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
  details.innerHTML = '';
  [['PM2.5', `${d.pm25} µg/m³`], ['O₃', `${d.o3} ppb`], ['NO₂', `${d.no2} ppb`]].forEach(([k, v]) => {
    const row = document.createElement('div');
    row.className = 'aqi-detail-row';
    row.innerHTML = `<span>${k}</span><span>${v}</span>`;
    details.appendChild(row);
  });
}

// ── UV ──
function renderUV(d) {
  document.getElementById('uvValue').textContent  = d.value;
  document.getElementById('uvValue').style.color  = d.color;
  document.getElementById('uvLabel').textContent  = d.label;
  document.getElementById('uvLabel').style.color  = d.color;
  document.getElementById('uvTip').textContent    = d.tip;
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
  const wrap = document.getElementById('radarWrap');
  document.getElementById('radarImg').style.display = 'none';
  wrap.innerHTML = `
    <div class="radar-placeholder">
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%">
            <stop offset="0%" stop-color="#0a2a1a"/><stop offset="100%" stop-color="#020a06"/>
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="200" height="200" fill="url(#radarBg)"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(131,197,190,0.1)" stroke-width="1"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(131,197,190,0.08)" stroke-width="1"/>
        <ellipse cx="85" cy="70" rx="18" ry="12" fill="rgba(131,197,190,0.3)" filter="url(#glow)"/>
        <ellipse cx="120" cy="110" rx="22" ry="15" fill="rgba(247,127,0,0.4)" filter="url(#glow)"/>
        <ellipse cx="75" cy="125" rx="12" ry="8" fill="rgba(230,57,70,0.5)" filter="url(#glow)"/>
        <line x1="100" y1="100" x2="180" y2="100" stroke="rgba(131,197,190,0.6)" stroke-width="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="3s" repeatCount="indefinite"/>
        </line>
        <circle cx="100" cy="100" r="3" fill="#83c5be"/>
        <text x="100" y="165" text-anchor="middle" fill="rgba(131,197,190,0.4)" font-size="8">台灣 雷達回波</text>
      </svg>
    </div>
    <div class="radar-overlay"><span class="radar-time">${h}:${m}</span></div>
  `;
}

// ── Last Update ──
function setLastUpdate() {
  const now = new Date();
  document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('zh-TW', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
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

function animateHeroTemp() {
  const el = document.getElementById('heroTemp');
  el.style.opacity = '0';
  el.style.transform = 'scale(0.8)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
  setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'scale(1)'; }, 200);
}

// ── 地區選單 ──
function buildLocationList(filter = '') {
  const list = document.getElementById('locationList');
  list.innerHTML = '';
  const filtered = filter
    ? TW_LOCATIONS.filter(l => l.name.includes(filter))
    : TW_LOCATIONS;

  filtered.forEach(loc => {
    const item = document.createElement('div');
    item.className = 'location-item' + (loc.name === currentLocation.name ? ' active' : '');
    item.innerHTML = `
      <span class="location-item-name">${loc.name}</span>
      ${loc.name === currentLocation.name ? '<span class="location-item-check">✓</span>' : ''}
    `;
    item.addEventListener('click', () => selectLocation(loc));
    list.appendChild(item);
  });
}

function filterLocations(val) {
  buildLocationList(val);
}

function toggleLocationPanel() {
  const panel   = document.getElementById('locationPanel');
  const overlay = document.getElementById('locationOverlay');
  const open    = panel.classList.toggle('open');
  overlay.classList.toggle('open', open);
  if (open) {
    buildLocationList();
    document.getElementById('locationSearch').value = '';
    document.getElementById('locationSearch').focus();
    // 顯示已儲存的 API Key（遮罩）
    const keyInput = document.getElementById('apiKeyInput');
    keyInput.value = CWA_API_KEY ? '••••••••••••••••' : '';
  }
}

function selectLocation(loc) {
  currentLocation = loc;
  toggleLocationPanel();
  loadWeather(loc);
}

function saveApiKey() {
  const input = document.getElementById('apiKeyInput');
  const val   = input.value.trim();
  if (val && val !== '••••••••••••••••') {
    CWA_API_KEY = val;
    localStorage.setItem('cwa_api_key', val);
  } else if (!val) {
    CWA_API_KEY = '';
    localStorage.removeItem('cwa_api_key');
  }
  input.value = CWA_API_KEY ? '••••••••••••••••' : '';
  toggleLocationPanel();
  loadWeather(currentLocation);
}

function openCWA() {
  window.open('https://opendata.cwa.gov.tw/', '_blank');
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  setHeroDate();
  createParticles();
  loadWeather(currentLocation);
  setTimeout(initScrollObserver, 100);
});
