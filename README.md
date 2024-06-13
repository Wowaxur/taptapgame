# Coin Clicker Game

This is a simple coin clicker game built with React and Redux. The objective of the game is to click on the coin to earn points and upgrade various attributes to improve your score.
 You can test game by this link : https://wowaxur.github.io/taptapgame/
## Features

- **Coin Click**: Click on the coin to earn points.
- **Energy Management**: Each click consumes energy. Energy recovers over time.
- **Upgrades**: Improve your click power, energy recovery rate, and maximum energy capacity.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Components

- **App**: Main component that integrates all other components.
- **Coin**: Displays the coin and handles click events.
- **EnergyBar**: Shows the current and maximum energy levels.
- **ScoreBar**: Displays the current score.
- **UpgradeBar**: Provides options to upgrade tap level, recovery level, and maximum energy level.

## State Management

The application state is managed using Redux. The main actions and reducers are defined in the `store` directory.

### Actions

- `incrementScore`: Increases the score based on the current tap level.
- `decrementEnergy`: Decreases the energy based on the current tap level.
- `recoverEnergy`: Recovers energy over time.
- `upgradeTapLevel`: Upgrades the tap level to increase points per click.
- `upgradeRecoveryLevel`: Upgrades the recovery level to increase energy recovery rate.
- `upgradeMaxEnergyLevel`: Upgrades the maximum energy level.

### Reducers

The main reducer handles the state transitions based on the actions dispatched.

## Usage

1. Click on the coin to earn points. Each click consumes energy.
2. Monitor your energy levels using the energy bar.
3. Use the upgrade bar to improve your click power, energy recovery rate, and maximum energy capacity.
4. Points and upgrades are saved in local storage to persist between sessions.



## Contact

For any questions or feedback, please contact [Your Name] at [Your Email].

---

Enjoy playing the Coin Clicker Game!