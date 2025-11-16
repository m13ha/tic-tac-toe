# Tic-Tac-Toe Game

A browser-based Tic-Tac-Toe game built with JavaScript ES6 modules and jQuery. Features intelligent AI gameplay with strategic move selection and a clean, responsive interface.

## Features

- **Smart AI Opponent:** Computer AI with winning strategy and blocking logic
- **MVC Architecture:** Clean separation using ES6 modules (Model, View, Controller)
- **Score Tracking:** Persistent score counter for player vs computer matches
- **Responsive Design:** Mobile-friendly interface that adapts to different screen sizes
- **Visual Feedback:** Winning combinations highlighted with color changes
- **Game Reset:** Reset individual games or full score counter

## Technical Implementation

- **Frontend:** Vanilla JavaScript (ES6 modules), jQuery 3.5.1, HTML5, CSS3
- **AI Logic:** Strategic move selection with win/block detection
- **Architecture:** MVC pattern with modular JavaScript files
- **Responsive:** CSS media queries for mobile compatibility

## How to Play

1. Open `index.html` in your web browser
2. You play as **X**, computer plays as **O**
3. Click any empty cell to make your move
4. Computer automatically responds with its strategic move
5. First to get three in a row (horizontal, vertical, or diagonal) wins
6. Scores are tracked automatically
7. Use "Reset" button to clear scores and start fresh

## Project Structure

```
tic-tac-toe-1/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Responsive styling
├── js/
│   ├── controller.js   # Game controller logic
│   ├── model.js        # Game state and AI logic
│   ├── view.js         # UI updates and rendering
│   └── jquery-3.5.1.js # jQuery library
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Setup

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. No additional setup or dependencies required

## AI Strategy

The computer AI implements:
- **Win Detection:** Attempts to complete winning combinations
- **Block Strategy:** Prevents player from winning
- **Random Fallback:** Makes strategic random moves when no immediate threats exist

## Contributing

Contributions to the project are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for personal and commercial purposes. However, attribution to the original authors is appreciated.

Enjoy playing the Tic-Tac-Toe game and have fun challenging the AI player! 🎮✨
