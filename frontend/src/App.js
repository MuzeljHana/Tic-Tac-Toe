import React from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { Col, Container, Row, Form, Button, ListGroup, Badge } from "react-bootstrap";
import Game from "./Game";

const socketClient = new Client({ brokerURL: "ws://localhost:8080/stomp" });
axios.defaults.baseURL = "http://localhost:8080";

function App() {
    const [lobbies, setLobbies] = React.useState([]);
    const [game, setGame] = React.useState({
        game: {}
    });
    const [player, setPlayer] = React.useState();

    const [menu, setMenu] = React.useState({
        lobbyID: ""
    });

    React.useEffect(() => {
        axios.get("/lobby").then((response) => {
            setLobbies(response.data);
        })
    }, []);

    const join = (lobbyID) => {
        axios.put(`/lobby/${lobbyID}`).then((response) => {
            let players = response.data.players;
            setPlayer(players[players.length - 1]);
            setGame(response.data);
            console.log("JOIN", response.data);

            socketClient.onConnect = (frame) => {
                socketClient.subscribe(`/topic/lobby/${lobbyID}`, receive);
            };
            socketClient.activate();
        })
    }

    const receive = (message) => {
        console.log(JSON.parse(message.body));
        setGame(JSON.parse(message.body));
    }

    const send = (pos) => {
        if (player.piece == game.game.nextPiece && 
            game.game.gameBoard[pos.y][pos.x] == "EMPTY" && 
            game.state != "DONE") {
            socketClient.publish({
                destination: `/app/lobby/${game.id}/player/${player.id}`,
                body: JSON.stringify(pos)
            });
        }
    }

    const disconnect = () => {

    }

    const createLobby = () => {
        axios.post("/lobby").then((response) => {
            join(response.data.id);

            let oldLobbies = Array.from(lobbies);
            oldLobbies.push(response.data);
            setLobbies(oldLobbies);
        });
    }

    const joinLobby = () => {
        join(menu.lobbyID);
    };

    const inputChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup as="ol" numbered>
                        {
                            lobbies.map((lobby) => {
                                return (
                                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                        <div>{lobby.id}</div>
                                        <Badge variant="primary" pill>{lobby.state}</Badge>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Lobby ID</Form.Label>
                            <Form.Control onChange={inputChange} type="text" name="lobbyID" placeholder="973b8e76-5503-11ec-bf63-0242ac130002" />
                        </Form.Group>
                        <Button variant="primary" onClick={joinLobby} >Join</Button>
                        <Button variant="secondary" onClick={createLobby} >Create</Button>
                    </Form>
                </Col>
                <Col>
                    <Game game={game} move={send} />
                </Col>
                <Col>
                    <p>Next: {game.game.nextPiece}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
