# GitHub Explorer

A React + TypeScript application that integrates with the GitHub API to allow users to search for GitHub users and view their repositories.

---

## Features

- Search for up to 5 GitHub users by username
- Display unlimited repositories for the selected user
- Loading states for user search and repositories fetching
- Error handling with clear UI feedback for API failures
- Keyboard support (search on Enter key)
- Responsive design with Material UI components
- Written entirely in TypeScript for type safety

---

## Getting Started

### Prerequisites

- Node.js (>=14.x recommended)
- npm or yarn

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/github-explorer.git
   cd github-explorer

2. Install dependencies:
   - npm install
   - yarn install
  
3. Start the development server:
   - npm start
   - yarn start

4. Open your browser and navigate to:
   - http://localhost:3000

### Usage

    - Enter a GitHub username or partial username in the input field.
    - Press Enter or click the Search button.
    - The app will display up to 5 users matching your query.
    - Click on a user accordion to expand and view their repositories.
    - Repository details include name, description, and star count.
    - Errors and loading states are displayed appropriately.

### Technologies Used

    - React 18
    - TypeScript
    - Material UI for UI components and styling
    - React Query for data fetching and caching
    - GitHub REST API v3

### 🧪 Tests

This app uses [React Testing Library](https://testing-library.com/) and [Jest](https://jestjs.io/) for unit and integration testing.

Run tests:

npm test

### Error handling

    - Displays error messages if fetching users or repositories fails.
    - Provides user-friendly feedback instead of silent failures.

### Contributing

Feel free to open issues or submit pull requests to improve the app!

### License

MIT

### Acknowledgements

    - GitHub API Documentation
    - Material UI
    - React Query