package com.example.tictactoe.game;

public class Game {
    private Piece[][] gameBoard = {
            {Piece.EMPTY, Piece.EMPTY, Piece.EMPTY},
            {Piece.EMPTY, Piece.EMPTY, Piece.EMPTY},
            {Piece.EMPTY, Piece.EMPTY, Piece.EMPTY}
    };
    private Piece nextPiece = Piece.CROSS;

    public Game() {
    }

    public void makeMove(Piece piece, Move move) {
        if (gameBoard[move.getY()][move.getX()] == Piece.EMPTY) {
            gameBoard[move.getY()][move.getX()] = piece;
            nextPiece = (piece == Piece.CROSS) ? Piece.CIRCLE : Piece.CROSS;
        }
    }

    public boolean isDone() {
        for (int row = 0; row < gameBoard.length; row++) {
            if (gameBoard[row][0] == gameBoard[row][1] &&
                gameBoard[row][1] == gameBoard[row][2] &&
                gameBoard[row][0] != Piece.EMPTY) {
                return true;
            }
        }
        for (int column = 0; column < gameBoard.length; column++) {
            if (gameBoard[0][column] == gameBoard[1][column] &&
                gameBoard[1][column] == gameBoard[2][column] &&
                gameBoard[0][column] != Piece.EMPTY ) {
                return true;
            }
        }
        if (gameBoard[0][0] == gameBoard[1][1] &&
            gameBoard[1][1] == gameBoard[2][2] &&
            gameBoard[0][0] != Piece.EMPTY ) {
            return true;
        }
        if (gameBoard[2][0] == gameBoard[1][1] &&
            gameBoard[1][1] == gameBoard[0][2] &&
            gameBoard[2][0] != Piece.EMPTY ) {
            return true;
        }
        for (int y = 0; y < gameBoard.length; y++) {
            for (int x = 0; x < gameBoard.length; x++) {
                if (gameBoard[y][x] == Piece.EMPTY) {
                    return false;
                }
            }
        }
        return false;
    }

    public Piece[][] getGameBoard() {
        return gameBoard;
    }

    public void setGameBoard(Piece[][] gameBoard) {
        this.gameBoard = gameBoard;
    }

    public Piece getNextPiece() {
        return nextPiece;
    }

    public void setNextPiece(Piece nextPiece) {
        this.nextPiece = nextPiece;
    }
}
