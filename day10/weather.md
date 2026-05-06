## 1. 주제
open weather API를 이용한 날씨 정보 제공 앱 만들기

## 2. 사용 API

### 2.1 endpoint
- https://openweathermap.org/data/2.5/weather

### 2.2 HTTP Method
- Http Method : GET

### 2.3 Request Data
- units=meric

### 2.4 Response Data
- DataType : JSON
- 데이터 형식
```
{
  "coord": {
    "lon": 126.97,
    "lat": 37.56
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "맑음",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 18.5,
    "feels_like": 17.9,
    "temp_min": 16.0,
    "temp_max": 20.1,
    "pressure": 1013,
    "humidity": 60,
    "sea_level": 1013,
    "grnd_level": 1008
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.5,
    "deg": 270,
    "gust": 5.1
  },
  "rain": {
    "1h": 2.5
  },
  "snow": {
    "1h": 0.5
  },
  "clouds": {
    "all": 10
  },
  "dt": 1711234567,
  "sys": {
    "country": "KR",
    "sunrise": 1711220000,
    "sunset": 1711265000
  },
  "timezone": 32400,
  "id": 1835848,
  "name": "Seoul",
  "cod": 200
}
```

### 2.5 API KEY
- fa503d879296924006dfa53afeabe46a

## 3. 필요한 데이터
- name : 도시 이름
- temp : 현재 기온
- temp_min : 최저기온
- temp_max : 최고기온
- speed : 풍속
- deg : 풍향
- icon : 날씨 아이콘

### 3.1 날씨 아이콘
- 날씨 아이콘 예제 경로 : https://openweathermap.org/img/wn/{icon}@2x.png
- 경로에 icon 부분 데이터로 치환
- 풍향 계산

### 3.2 풍향 계산

| 인덱스 | deg | 방위 |
|---|---|---|
| 0 | 0 / 360 | 북 |
| 1 | 22.5 | 북북동 |
| 2 | 45 | 북동 |
| 3 | 67.5 | 동북동 |
| 4 | 90 | 동 |
| 5 | 112.5 | 동남동 |
| 6 | 135 | 남동 |
| 7 | 157.5 | 남남동 |
| 8 | 180 | 남 |
| 9 | 202.5 | 남남서 |
| 10 | 225 | 남서 |
| 11 | 247.5 | 서남서 |
| 12 | 270 | 서 |
| 13 | 292.5 | 서북서 |
| 14 | 315 | 북서 |
| 15 | 337.5 | 북북서 |


## 4. 기술 스택

- HTML5 / CSS3 / JavaScript (Vanilla)
- Bootstrap 5.3 (CDN)
- OpenWeatherMap API (v2.5)

---

## 5. 파일 구조

```
weather-app/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

---

## 6. 구현 요구사항

### 6.1 index.html 구조

Bootstrap 5.3 CDN을 사용하며, 아래 레이아웃을 구성한다.

```
[검색창] → 도시명 입력 + 검색 버튼
[메인 카드]
  ├── 도시명
  ├── 날씨 아이콘 (OpenWeatherMap 제공 아이콘)
  ├── 현재 기온
  ├── 최저 / 최고 기온
  ├── 풍속 (m/s)
  └── 풍향 (방위 문자열)
```

### 6.2 app.js 구현 사항

#### API 호출

```
GET https://api.openweathermap.org/data/2.5/weather
  ?q={도시명}
  &units=metric
  &appid={API_KEY}
  &lang=kr
```

- API_KEY는 `app.js` 상단 상수로 분리한다.
- fetch() 사용, async/await 패턴으로 작성한다.
- 에러 처리: 도시명 없음, 네트워크 오류, 404 응답을 각각 구분하여 사용자에게 메시지를 표시한다.

#### 날씨 아이콘

- 응답 데이터의 `weather[0].icon` 값을 아래 경로에 대입하여 `<img>` src에 적용한다.
- `https://openweathermap.org/img/wn/{icon}@2x.png`

#### 풍향 계산

`wind.deg` 값을 받아 아래 함수로 16방위 문자열로 변환한다.

```javascript
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
```

#### 화면 렌더링

API 응답에서 아래 데이터를 추출하여 DOM에 반영한다.

| 응답 필드 | 표시 위치 |
|---|---|
| `name` | 도시명 |
| `main.temp` | 현재 기온 (소수점 1자리) |
| `main.temp_min` | 최저 기온 (소수점 1자리) |
| `main.temp_max` | 최고 기온 (소수점 1자리) |
| `wind.speed` | 풍속 (m/s) |
| `wind.deg` | 풍향 (degToDirection 변환 후 표시) |
| `weather[0].icon` | 날씨 아이콘 img src |

### 6.3 style.css

- Bootstrap 기본 스타일을 기반으로 한다.
- 메인 카드 배경: 다크 네이비 계열 (`#0f2744` 권장)
- 카드 텍스트 색상: 흰색
- 현재 기온: 대형 폰트 (font-size 기준 4rem 이상)
- 반응형: 모바일(375px) ~ 데스크탑(1200px) 대응
- 검색창은 상단 고정 또는 카드 위에 배치

---

## 7. 동작 흐름

```
1. 페이지 로드 시 기본 도시(Seoul)로 자동 검색 실행
2. 검색창에 도시명 입력 → Enter 또는 버튼 클릭 시 API 호출
3. 응답 수신 → 화면 갱신
4. 오류 발생 → 사용자에게 안내 메시지 표시
```

---

## 8. 주의사항

- API_KEY는 코드 상단 상수로 선언하되, 실제 키 값은 `YOUR_API_KEY` 플레이스홀더로 남긴다.
- `lang=kr` 파라미터를 추가하면 `weather[0].description`이 한국어로 응답된다.
- `units=metric` 적용 시 온도 단위는 섭씨(°C), 풍속 단위는 m/s이다.