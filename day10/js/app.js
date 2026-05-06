const API_KEY = 'fa503d879296924006dfa53afeabe46a';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function degToDirection(deg) {
  const dirs = [
    '북', '북북동', '북동', '동북동',
    '동', '동남동', '남동', '남남동',
    '남', '남남서', '남서', '서남서',
    '서', '서북서', '북서', '북북서'
  ];
  const index = Math.round(deg / 22.5) % 16;
  return dirs[index];
}

function showError(message) {
  const errorEl = document.getElementById('error-message');
  const cardEl = document.getElementById('weather-card');
  errorEl.textContent = message;
  errorEl.classList.remove('d-none');
  cardEl.classList.add('d-none');
}

function hideError() {
  document.getElementById('error-message').classList.add('d-none');
}

function renderWeather(data) {
  const card = document.getElementById('weather-card');

  document.getElementById('city-name').textContent = data.name + ', ' + data.sys.country;
  document.getElementById('weather-desc').textContent = data.weather[0].description;
  document.getElementById('weather-icon').src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('weather-icon').alt = data.weather[0].description;
  document.getElementById('temp-current').textContent = data.main.temp.toFixed(1) + '°C';
  document.getElementById('temp-min').textContent = data.main.temp_min.toFixed(1) + '°C';
  document.getElementById('temp-max').textContent = data.main.temp_max.toFixed(1) + '°C';
  document.getElementById('wind-speed').textContent = data.wind.speed + ' m/s';
  document.getElementById('wind-dir').textContent = degToDirection(data.wind.deg);

  card.classList.remove('d-none');
  hideError();
}

async function fetchWeather(city) {
  if (!city.trim()) {
    showError('도시명을 입력해주세요.');
    return;
  }

  const loadingEl = document.getElementById('loading');
  loadingEl.classList.remove('d-none');
  document.getElementById('weather-card').classList.add('d-none');
  hideError();

  try {
    const url = `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=kr`;
    const response = await fetch(url);

    if (response.status === 404) {
      showError(`"${city}" 도시를 찾을 수 없습니다. 도시명을 확인해주세요.`);
      return;
    }

    if (response.status === 401) {
      showError('API 키가 유효하지 않습니다.');
      return;
    }

    if (!response.ok) {
      showError(`오류가 발생했습니다. (상태 코드: ${response.status})`);
      return;
    }

    const data = await response.json();
    renderWeather(data);

  } catch (error) {
    showError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
  } finally {
    loadingEl.classList.add('d-none');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  searchBtn.addEventListener('click', () => {
    fetchWeather(searchInput.value);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      fetchWeather(searchInput.value);
    }
  });

  fetchWeather('Seoul');
});
