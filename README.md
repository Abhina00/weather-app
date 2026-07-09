# 🌦️ MUI Weather App

A React + Material UI weather app with login, city search, live weather details, and per-user search history.


---

## ✨ Features

- 🔐 **Login / Register** — demo auth, stored in browser `localStorage`
- 🔎 **City search** — live weather via the [OpenWeatherMap API](https://openweathermap.org/api)
- 🌡️ **Weather details** — temperature, feels-like, humidity, wind, pressure, condition icon
- 🕒 **Search history** — per-user, persisted in `localStorage`, click to re-search, delete/clear individual entries


## 🛠️ Tech Stack

| Layer     | Choice                          |
|-----------|----------------------------------|
| Framework | React 18 (Create React App)      |
| UI        | Material UI (MUI) v5             |
| Weather   | OpenWeatherMap Current Weather API |
| Auth      | Client-side demo auth (`localStorage`) |
| Storage   | Browser `localStorage`           |

## 🚀 Getting Started

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
```

### 2. Add your API key
Get a free key at [openweathermap.org/api](https://openweathermap.org/api) (the "Current Weather Data" plan is enough — free tier gives 1,000 calls/day).

```bash
cp .env.example .env
```

Then edit `.env`:
```env
REACT_APP_WEATHER_API_KEY=your_actual_key_here
```

> ⚠️ New keys can take **10 minutes to 2 hours** to activate. If you get a `401 Unauthorized`, wait a bit before assuming something's broken.

### 3. Run it
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000). Log in with any username/password (it's demo auth — it creates the account on first use via Register).

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.jsx     # login/register/logout state, exposed via useAuth()
├── services/
│   └── weatherApi.js       # fetches + normalizes OpenWeatherMap responses
├── utils/
│   └── storage.js          # localStorage read/write helpers
├── components/
│   ├── Login.jsx           # login/register form (tabs)
│   ├── Dashboard.jsx       # main authenticated screen — wires everything together
│   ├── SearchBar.jsx       # city search input
│   ├── WeatherCard.jsx     # renders current weather details
│   └── SearchHistory.jsx   # list of past searches (select / delete / clear)
├── App.jsx                 # shows Login or Dashboard depending on auth state
├── theme.js                # MUI theme (colors, shape, typography)
└── index.js                # app entry point, wraps app in ThemeProvider + AuthProvider
```

## 🔑 Environment Variables

| Variable                      | Required | Description                                  |
|--------------------------------|----------|-----------------------------------------------|
| `REACT_APP_WEATHER_API_KEY`   | ✅ Yes   | Your OpenWeatherMap API key                   |

> A `.env.example` is included as a template — never commit your real `.env` file (it's already in `.gitignore`).

## 🧠 How It Works

### Auth
`AuthContext` keeps a `user` object in React state and mirrors it to `localStorage` so a page refresh doesn't log you out. `register()` stores `{ username: { password } }` in `localStorage["weather_app_users"]`; `login()` checks against it.

> **This is demo-only auth** — passwords are stored in plain text in the browser. For production, swap out `AuthContext.jsx` for a real backend (Firebase Auth, Auth0, Supabase, or your own API with hashed passwords + JWT). Every component already talks to `useAuth()` (`login`, `register`, `logout`, `user`), so no other file needs to change.

### Weather data
`services/weatherApi.js` calls `/data/2.5/weather` with `units=metric` and normalizes the response into a flat object (`temp`, `humidity`, `windSpeed`, `description`, `icon`, etc.), so components never touch the raw API shape.

### Search history
Stored per-user under `weather_app_history_<username>`, capped at the 10 most recent, de-duplicated by city name, newest first. Clicking an entry re-runs the search live rather than showing stale cached data.

## 🗺️ Roadmap

- [ ] Backend so accounts/history sync across devices
- [ ] 5-day forecast (`/forecast` endpoint)
- [ ] Geolocation ("use my current location")
- [ ] °C / °F unit toggle
- [ ] Debounced city autocomplete via OpenWeatherMap's Geocoding API

## 🤝 Contributing

Issues and PRs welcome. For major changes, open an issue first to discuss what you'd like to change.

## 📄 License

[MIT](LICENSE)