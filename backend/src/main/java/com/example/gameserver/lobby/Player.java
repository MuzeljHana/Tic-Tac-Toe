package com.example.gameserver.lobby;

import com.example.gameserver.game.Piece;

public class Player {
    private String id;
    private Piece piece = Piece.EMPTY;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Piece getPiece() {
        return piece;
    }

    public void setPiece(Piece piece) {
        this.piece = piece;
    }
}
