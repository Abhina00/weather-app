# MUI Weather App

A React + Material UI weather app with:
- **Login / Register** (demo auth, stored in browser localStorage)
- **City search** (live weather via the OpenWeatherMap API)
- **Weather details view** (temperature, humidity, wind, pressure, icon)
- **Search history** (per-user, persisted in localStorage, click to re-search, delete/clear)

## 1. Setup

```bash
npm install
```

Get a free API key from https://openweathermap.org/api (the free "Current Weather Data" plan is enough), then:

```bash
cp .env.example .env
# edit .env and paste your key into REACT_APP_WEATHER_API_KEY
```

## 2. Run

```bash
npm start
```

Opens at http://localhost:3000.

## 3. How it's structured

```
src/
  context/AuthContext.jsx   -> login/register/logout state, exposed via useAuth()
  services/weatherApi.js    -> fetch + normalize OpenWeatherMap responses
  utils/storage.js          -> localStorage read/write helpers
  components/
    Login.jsx               -> login/register form (tabs)
    Dashboard.jsx           -> the main authenticated screen, wires everything together
    SearchBar.jsx           -> city search input
    WeatherCard.jsx         -> renders the current weather details
    SearchHistory.jsx       -> list of past searches (select / delete / clear)
  App.jsx                   -> shows Login or Dashboard depending on auth state
  theme.js                  -> MUI theme (colors, shape, typography)
  index.js                  -> app entry point, wraps app in ThemeProvider + AuthProvider
```

### Auth flow
`AuthContext` keeps a `user` object in state and mirrors it to `localStorage` so a refresh
doesn't log you out. `register()` stores `{ username: { password } }` in
`localStorage["weather_app_users"]`, and `login()` checks against it.

**This is demo-only auth** — passwords are stored in plain text in the browser. For anything
real, replace `AuthContext` with calls to a real backend (Firebase Auth, Auth0, Supabase, or
your own Node/Express API with hashed passwords + JWT sessions). Because all the UI already
talks to `useAuth()` (`login`, `register`, `logout`, `user`), you'd only need to change the
implementation inside `AuthContext.jsx` — no other component needs to change.

### Weather data
`services/weatherApi.js` calls OpenWeatherMap's `/data/2.5/weather` endpoint with
`units=metric` and normalizes the response into a flat object (`temp`, `humidity`, `windSpeed`,
`description`, `icon`, etc.) so components don't need to know the raw API shape. Swap this file
out if you'd rather use a different provider (WeatherAPI.com, Tomorrow.io, etc).

### Search history
Stored per-user under `weather_app_history_<username>` so different accounts don't share
history. Capped at the 10 most recent, de-duplicated by city name, newest first. Clicking an
entry re-runs the search (so you always see live data, not stale cached data).

## 4. Possible next steps
- Add a backend so accounts and history sync across devices
- Add 5-day forecast (OpenWeatherMap's `/forecast` endpoint)
- Add geolocation ("use my current location")
- Add unit toggle (°C / °F)
- Add debounced city autocomplete using OpenWeatherMap's Geocoding API
