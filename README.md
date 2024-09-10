# Parking App

A React Native application for managing parking information, using `styled-components` for styling with theming support.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Manage parking locations and pricing.
- Display current location with reverse geocoding.
- Responsive UI with themed styling using `styled-components`.
- Simple and clean design.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bostan-Victor/ParkingGuruFront.git
   cd parking-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Install Expo CLI if not already installed:

   ```bash
   npm install -g expo-cli
   ```

### Usage

1. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

2. Scan the QR code with the Expo Go app on your mobile device to run the app on your device.

### Running on Specific Platforms

- To run on an Android emulator or connected device:

  ```bash
  npm run android
  ```

- To run on an iOS simulator:

  ```bash
  npm run ios
  ```

- To run on the web:

  ```bash
  npm run web
  ```

## Project Structure

```
/src
├── components        # Reusable UI components
├── screens           # Application screens (Home, Login, etc.)
├── hooks             # Custom hooks
├── styles            # Global styles and theme
│   ├── theme.ts      # Theme definitions
│   ├── globalStyles.ts # Global styled components
│   └── styled.d.ts   # TypeScript definitions for styled-components theme
├── App.tsx           # Main entry point of the app
```

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **Expo**: For rapid development and testing.
- **styled-components**: For CSS-in-JS styling with support for theming.
- **TypeScript**: For type safety and modern JavaScript development.

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`.
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`.
4. Push to the branch: `git push origin feature/AmazingFeature`.
5. Open a pull request.

## License

This project is licensed under the MIT License

## Business Logic

The diagram illustrates the business logic of the application.

![Business Logic Diagram](./assets/project_schema2.svg)
