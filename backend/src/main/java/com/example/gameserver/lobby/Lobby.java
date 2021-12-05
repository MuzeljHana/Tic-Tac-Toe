package com.example.gameserver.lobby;

import com.example.gameserver.game.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Lobby {
    private String id;
    private List<Player> players = new ArrayList<>();
    private Game game = new Game();
    private State state = State.WAITING;
    private Player winner = null;

    public Lobby() {
        id = UUID.randomUUID().toString();
    }

    public Player joinLobby() {
        Player player = new Player();
        player.setId(UUID.randomUUID().toString());

        if (players.size() == 0) {
            player.setPiece(Piece.CROSS);
        } else if (players.size() == 1) {
            player.setPiece(Piece.CIRCLE);
        }
        players.add(player);

        if (players.size() >= 2) {
            state = State.IN_PROGRESS;
        }

        return player;
    }

    public void leaveLobby(Player player) {
        players.remove(player);
    }

    public Game updateGame(Player player, Move move) {
        if (state == State.IN_PROGRESS && player.getPiece() == game.getNextPiece()) {
            game.makeMove(player.getPiece(), move);

            if (game.isDone()) {
                state = State.DONE;
                winner = player;
            }
        }
        return game;
    }

    public Game getGame() {
        return game;
    }

    public String getId() {
        return id;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public State getState() {
        return state;
    }

    public Player getWinner() {
        return winner;
    }
}
