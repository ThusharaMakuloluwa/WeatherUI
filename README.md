# WeatherUI – Angular Frontend 

This is the **Angular Frontend Application** developed for the **Weather App**.  
It connects to the ASP.NET Core Web API backend and displays weather data for multiple cities.  
The entire application is secured using **Auth0 Authentication & Authorization**.

Backend → [WeatherBE](https://github.com/ThusharaMakuloluwa/WeatherBE.git)

---

## Features

### ✔ Weather Application
- Load city list from backend API  
- Display current weather information  
- Organized components/services/models

### ✔ Authentication (Auth0)
- Login & Logout using Auth0 Hosted Login Page  
- Route protection via AuthGuard  
- API calls secured using JWT (Auth0 Access Tokens)  
- Automatic token injection using Http Interceptor  
- **Public signups disabled**  
- **Only pre-registered users allowed**   

### ✔ Test User

| Field | Value |
|-------|--------|
| **Email** | careers@fidenz.com |
| **Password** | Pass#fidenz |

---

## Tech Stack

- [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.
- TypeScript
- SCSS
- HTML
- Auth0 Angular SDK
- Angular HttpClient

---

## Setup
To start a local development server, run:
```bash
ng serve
```

Once the server is running, open your browser and navigate to http://localhost:4200/.
Make sure the backend API server is running.

