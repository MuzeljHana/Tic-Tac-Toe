package com.example.tictactoe;

import com.example.tictactoe.game.Move;
import com.example.tictactoe.lobby.Player;
import com.example.tictactoe.lobby.Lobby;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class LobbyController {

    private HashMap<String, Lobby> lobbies = new HashMap<>();

    @GetMapping("/lobby")
    public List<Lobby> getLobbies() {
        return new ArrayList<Lobby>(lobbies.values());
    }

    @PostMapping("/lobby")
    public Lobby createLobby() {
        Lobby lobby = new Lobby();
        lobbies.put(lobby.getId(), lobby);
        return lobby;
    }

    @PutMapping("/lobby/{lobbyID}")
    public Lobby joinLobby(@PathVariable String lobbyID) {
        Lobby lobby = lobbies.get(lobbyID);
        lobby.joinLobby();
        return lobby;
    }

    @DeleteMapping("/lobby/{lobbyID}/player/{playerID}")
    public Lobby leaveLobby(@DestinationVariable String lobbyID, @DestinationVariable String playerID) {
        Lobby lobby = lobbies.get(lobbyID);

        Optional<Player> player = lobby.getPlayers().stream().filter(el -> el.getId().equals(playerID)).findFirst();
        if (player.isPresent()) {
            lobby.leaveLobby(player.get());
        }

        if (lobby.getPlayers().size() == 0) {
            lobbies.remove(lobby);
        }

        return lobby;
    }

    @MessageMapping("/lobby/{lobbyID}/player/{playerID}")
    @SendTo("/topic/lobby/{lobbyID}")
    public Lobby makeMove(@DestinationVariable String lobbyID, @DestinationVariable String playerID, Move move) {
        Lobby lobby = lobbies.get(lobbyID);

        Optional<Player> player = lobby.getPlayers().stream().filter(el -> el.getId().equals(playerID)).findFirst();
        if (player.isPresent()) {
            lobby.updateGame(player.get(), move);
        }

        return lobby;
    }
}
