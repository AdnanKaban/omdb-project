# 🎬 CineSearch - Premium Movie Search Application

> A modern, responsive movie search application built with **Layered Architecture**, featuring real-time OMDB API integration, premium glassmorphism design, and dark/light mode support.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-8338ec?style=for-the-badge)](https://adnankaban.github.io/omdb-project/frontend/)
[![Backend Status](https://img.shields.io/badge/Backend-Online-success?style=for-the-badge)](https://omdb-project-0x4w.onrender.com)
---

## 🌐 Live Demo

🎬 **Frontend:** [https://adnankaban.github.io/omdb-project/frontend/](https://adnankaban.github.io/omdb-project/frontend/)

🔧 **Backend API:** [\[https://omdb-project-0x4w.onrender.com](https://omdb-project-0x4w.onrender.com/)

> ⚠️ The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on the first request.

---

## ✨ Features

### Core Features
- 🔍 **Real-time Movie Search** - Search through thousands of movies via OMDB API
- 📊 **Pagination** - Navigate through hundreds of search results seamlessly
- 🎯 **Type Filter** - Filter by Movies, Series, or Episodes
- 📱 **Detailed Movie View** - Modal with comprehensive movie information
- 💾 **State Persistence** - LocalStorage saves your last search even after page refresh
- ⚠️ **Error Handling** - User-friendly error messages for all edge cases

### Premium Design
- 🎨 **Glassmorphism UI** - Modern, frosted glass aesthetics
- 🌓 **Dark/Light Mode** - Theme toggle with smooth transitions
- ✨ **Premium Animations** - Floating orbs, glow effects, and smooth transitions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ♿ **Accessible** - Reduced motion support, semantic HTML

---

## 🏗️ Architecture

This project follows **N-Tier Layered Architecture** principles, providing clear separation of concerns and maintainability.

### Backend Architecture (Node.js + Express)
backend/
├── src/
│   ├── core/                    # Generic utilities & abstractions
│   │   ├── utilities/results/   # Result pattern (SuccessResult, ErrorResult)
│   │   └── constants/           # API constants
│   │
│   ├── entities/                # Data models
│   │   ├── concrete/            # Domain entities (Movie)
│   │   └── dtos/                # Data Transfer Objects
│   │
│   ├── dataAccess/              # Data access layer
│   │   ├── abstract/            # Repository interfaces (IMovieDal)
│   │   └── concrete/omdb/       # OMDB API implementation
│   │
│   ├── business/                # Business logic
│   │   ├── abstract/            # Service interfaces (IMovieService)
│   │   ├── concrete/            # Manager implementations
│   │   └── constants/           # Business messages
│   │
│   └── webApi/                  # Presentation layer
│       ├── controllers/         # HTTP controllers
│       ├── routes/              # Route definitions
│       └── middlewares/         # Error handlers
│
└── server.js                    # Dependency Injection & app startup
### Frontend Architecture (Vanilla JS + ES6 Modules)
frontend/
├── src/
│   ├── core/                    # Core utilities
│   │   ├── constants/           # API URLs
│   │   └── utilities/           # HTTP client, Storage helper
│   │
│   ├── entities/dtos/           # Data models
│   │
│   ├── services/                # Backend communication
│   │   ├── abstract/            # Service interfaces
│   │   └── concrete/            # API service implementations
│   │
│   └── presentation/views/      # UI rendering
│
├── index.html                   # Entry point
├── styles.css                   # Glassmorphism styles
└── app.js                       # Application bootstrap
### 🎯 SOLID Principles Applied

- ✅ **Single Responsibility** - Each layer has one clear purpose
- ✅ **Open/Closed** - Extensible through interfaces, closed for modification
- ✅ **Liskov Substitution** - Concrete implementations are interchangeable
- ✅ **Interface Segregation** - Focused, minimal interfaces
- ✅ **Dependency Inversion** - High-level modules depend on abstractions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| CSS3 | Glassmorphism, animations, responsive design |
| Vanilla JavaScript (ES6+) | Modern features, no framework needed |
| ES6 Modules | Code organization |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| Axios | HTTP client for OMDB API |
| dotenv | Environment variables |
| CORS | Cross-origin resource sharing |

### Deployment
| Service | Purpose |
|---------|---------|
| GitHub Pages | Frontend hosting |
| Render | Backend hosting |
| GitHub | Version control |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- OMDB API Key ([Get one here](http://www.omdbapi.com/apikey.aspx))

### Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/AdnanKaban/omdb-project.git
cd omdb-project
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "OMDB_API_KEY=your_api_key_here" >> .env
echo "OMDB_BASE_URL=https://www.omdbapi.com" >> .env

# Start the server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../frontend

# Open with Live Server (VS Code extension recommended)
# Or use any HTTP server:
npx serve .
```

Frontend will run on `http://localhost:5500` (or similar)

---

## 📡 API Endpoints

### Search Movies
GET /api/movies/search?s={query}&type={type}&page={page}
**Parameters:**
- `s` (required) - Search query (min 2 characters)
- `type` (optional) - `movie`, `series`, or `episode`
- `page` (optional) - Page number for pagination

**Example Response:**
```json
{
  "success": true,
  "message": "Filmler başarıyla listelendi",
  "data": {
    "movies": [...],
    "totalResults": 635,
    "page": 1
  }
}
```

### Get Movie Detail
GET /api/movies/:imdbID
**Example:**
GET /api/movies/tt0372784
---

## 🎨 Design Highlights

### Glassmorphism Effects
The UI uses cutting-edge glassmorphism design with:
- Backdrop filters (`backdrop-filter: blur()`)
- Transparent overlays
- Subtle borders
- Layered shadows

### Animated Background
Three floating orbs create a dynamic, cinematic atmosphere:
- Smooth `transform` animations
- 20-second cycles
- Reduced motion support

### Theme System
CSS custom properties enable seamless theme switching:
- Persistent across sessions (LocalStorage)
- Smooth transitions
- Optimized color palettes for both modes

---

## 📦 Project Structure
omdb-project/
├── backend/              # Node.js + Express API
├── frontend/             # Vanilla JS SPA
├── index.html            # GitHub Pages redirect
└── README.md             # You are here!
---

## 🧪 Testing

### Manual Test Cases

✅ **Search functionality** - Various movie titles  
✅ **Empty search** - Validation errors  
✅ **Special characters** - Unicode, symbols  
✅ **Pagination** - Multi-page results  
✅ **Type filtering** - Movies, Series, Episodes  
✅ **Movie details** - Modal opens with all info  
✅ **Error states** - Network errors, invalid IDs  
✅ **LocalStorage** - State persistence after refresh  
✅ **Theme toggle** - Dark/Light mode switching  
✅ **Responsive design** - Mobile, tablet, desktop  

---

## Security Considerations

- ✅ API key stored in environment variables (never exposed)
- ✅ `.env` file gitignored
- ✅ Backend acts as proxy (frontend never sees API key)
- ✅ CORS configured properly
- ✅ HTTPS enforced (production)

---

## Future Enhancements

- [ ] Favorite movies (LocalStorage)
- [ ] Search history dropdown
- [ ] User authentication
- [ ] Movie recommendations
- [ ] Advanced filters (year range, IMDb rating)
- [ ] Trailer integration
- [ ] Internationalization (i18n)
- [ ] Unit tests with Jest
- [ ] CI/CD pipeline

---

##  Author

**Adnan Kaban**
- GitHub: [@AdnanKaban](https://github.com/AdnanKaban)

---

---

##  Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing comprehensive movie data
- Glassmorphism design inspiration from modern UI trends
- Layered architecture principles from enterprise software development

---