document.addEventListener('DOMContentLoaded', () => {
            // Game state variables
            let board = ['', '', '', '', '', '', '', '', ''];
            let currentPlayer = 'X';
            let gameActive = true;
            let scores = {
                X: 0,
                O: 0,
                draws: 0
            };

            // Winning combinations
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            // DOM elements
            const statusDisplay = document.getElementById('status');
            const cells = document.querySelectorAll('.cell');
            const restartBtn = document.getElementById('restart-btn');
            const newGameBtn = document.getElementById('new-game-btn');
            const xScoreEl = document.getElementById('x-score');
            const oScoreEl = document.getElementById('o-score');
            const drawsEl = document.getElementById('draws');

            // Initialize the game
            initGame();

            function initGame() {
                cells.forEach(cell => {
                    cell.addEventListener('click', handleCellClick);
                    cell.classList.remove('x', 'o', 'win');
                });
                
                restartBtn.addEventListener('click', restartGame);
                newGameBtn.addEventListener('click', newGame);
                
                updateStatus();
            }

            function handleCellClick(e) {
                const cell = e.target;
                const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
                
                // Check if cell is already taken or game is not active
                if (board[cellIndex] !== '' || !gameActive) return;
                
                // Update board and UI
                board[cellIndex] = currentPlayer;
                cell.classList.add(currentPlayer.toLowerCase());
                
                // Check for win or draw
                if (checkWin()) {
                    endGame(false);
                } else if (isDraw()) {
                    endGame(true);
                } else {
                    // Switch player
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateStatus();
                }
            }

            function checkWin() {
                for (let i = 0; i < winPatterns.length; i++) {
                    const [a, b, c] = winPatterns[i];
                    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                        // Highlight winning cells
                        cells[a].classList.add('win');
                        cells[b].classList.add('win');
                        cells[c].classList.add('win');
                        return true;
                    }
                }
                return false;
            }

            function isDraw() {
                return !board.includes('') && !checkWin();
            }

            function endGame(isDraw) {
                gameActive = false;
                
                if (isDraw) {
                    statusDisplay.textContent = "Game ended in a draw!";
                    scores.draws++;
                    drawsEl.textContent = scores.draws;
                } else {
                    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
                    scores[currentPlayer]++;
                    
                    if (currentPlayer === 'X') {
                        xScoreEl.textContent = scores.X;
                    } else {
                        oScoreEl.textContent = scores.O;
                    }
                }
            }

            function updateStatus() {
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
            }

            function restartGame() {
                // Clear the board
                board = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                currentPlayer = 'X';
                
                // Reset UI
                cells.forEach(cell => {
                    cell.classList.remove('x', 'o', 'win');
                });
                
                updateStatus();
            }

            function newGame() {
                // Reset scores
                scores = {
                    X: 0,
                    O: 0,
                    draws: 0
                };
                
                xScoreEl.textContent = '0';
                oScoreEl.textContent = '0';
                drawsEl.textContent = '0';
                
                restartGame();
            }
        });