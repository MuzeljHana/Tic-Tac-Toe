package com.example.gameserver.game;

public class Move {
    private int x;
    private int y;

    public Move() {
    }

    public Move(int x, int y, int player) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
