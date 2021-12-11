import React from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import Game from "./Game";
import Menu from "./Menu";

const socketClient = new Client({ brokerURL: "ws://localhost:8080/stomp" });
axios.defaults.baseURL = "http://localhost:8080";

function App() {
    const [socketSub, setSocketSub] = React.useState();
    const [lobby, setLobby] = React.useState({
        id: "",
        state: "",
        game: {}
    });
    const [player, setPlayer] = React.useState({
        piece: ""
    });

    const [showModal, setShowModal] = React.useState(true);

    React.useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            disconnectSocket();

            axios.delete(`/lobby/${lobby.id}/player/${player.id}`).then((response) => {
                console.log(response.data);
            });
        });
    });

    const join = (lobbyID) => {
        axios.get("/lobby").then((response) => {
            let lobbies = response.data;
            if (lobbies.find((el) => { return el.id == lobbyID }) != undefined) {
                axios.put(`/lobby/${lobbyID}`).then((response) => {
                    let players = response.data.players;
                    setLobby({
                        ...lobby,
                        ...response.data
                    });
                    setPlayer(players[players.length - 1]);

                    console.log("JOIN", {
                        ...lobby,
                        ...response.data
                    },
                        players[players.length - 1]
                    );

                    socketClient.onConnect = (frame) => {
                        setSocketSub(socketClient.subscribe(`/topic/lobby/${lobbyID}`, receive));
                    };
                    socketClient.activate();

                    toggleModal();
                });
            }
        });

    };

    const receive = (message) => {
        let messageBody = JSON.parse(message.body);
        console.log("RECEIVE", messageBody);
        setLobby(messageBody);
    };

    const send = (pos) => {
        if (player.piece == lobby.game.nextPiece &&
            lobby.game.gameBoard[pos.y][pos.x] == "EMPTY" &&
            lobby.state != "DONE") {
            console.log("SEND", pos);
            socketClient.publish({
                destination: `/app/lobby/${lobby.id}/player/${player.id}`,
                body: JSON.stringify(pos)
            });
        }
    };

    const disconnectSocket = () => {
        socketSub.unsubscribe();
        socketClient.deactivate();
    };

    const createLobby = () => {
        axios.post("/lobby").then((response) => {
            join(response.data.id);
        });
    };

    const joinLobby = () => {
        join(lobby.id);
    };

    const disconnectHandle = () => {
        disconnectSocket();
        toggleModal();
    };

    const changeInput = (e) => {
        setLobby({
            ...lobby,
            id: e.target.value
        })
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <Container>
            <Menu show={showModal} onHide={toggleModal} joinLobby={joinLobby} createLobby={createLobby} lobbyID={changeInput} />
            <Row className="justify-content-md-end vh-100 align-items-center">
                <Col>
                    <Game game={lobby} move={send} />
                </Col>
                <Col sm={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Game: {lobby.state.toLowerCase()}</Card.Title>
                            <Card.Subtitle className="mb-2 small">
                                <code className="text-muted">{lobby.id}</code>
                            </Card.Subtitle>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        <span>Your piece: {player.piece.toLowerCase()}</span>
                                    </Col>
                                </Row>
                            </Card.Text>
                            <Button variant="outline-secondary" onClick={disconnectHandle}>Disconnect</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
