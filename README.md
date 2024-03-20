# News App Project

Welcome to the News App project! This ReactJS project is set up with Vite, utilizing Firebase for user authentication. The app fetches data from a News API, incorporates React Router, and employs various React Hooks for state management.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)


## Features

1. **User Authentication:**
   - Users can sign up or log in using Firebase authentication and SignIn with google is also available.

2. **Top News Display:**
   - Fetches and displays top news articles from a News API.

3. **Favorite News:**
   - Users can mark articles as favorites( as well delete functionalty is also available), storing them in the Firebase database.

4. **News Details:**
   - Clicking on a news card opens a detailed view with an option to view the full article.

5. **Navigation:**
   - Navbar with a logo for easy navigation.
   - Logout button for user convenience.
   - Categorises are also mentioned on Navbar(like gaming,technology etc)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/news-app.git
   cd news-app
2. Install dependencies:
- npm install
  
3. Set up Firebase:
 i) Create a Firebase project and configure the 
   Firebase authentication and database.
 ii) Update the Firebase configuration in the project.

4. Set up environment variables:
   i) Create a .env file in the root directory of the project and add these variables with values in it:
      - VITE_API_KEY=your-key-here (generate this from https://newsapi.org)
      - VITE_API_URL=https://newsapi.org/v2/top-headlines?country=in&category=

5.Run the app:
- npm run dev

## Usage
 - Navigate to the app in your web browser.
 - Sign up or log in to access the top news.
 - Click on the heart icon to save a news article to 
     your favorites.
 -   Click on the delete icon in favourite section to delete a  particular news article 
      from your favorites.
 - View detailed news information by clicking on a 
    news card.
 - Click on the "Full Article" link to read the 
    complete article.
 - Use the logout button or app logo to navigate easily.

 ## Dependencies
 - React-router-dom
 - Firebase
   
## Contribution
Contributions are welcome! Feel free to open issues or pull requests.
