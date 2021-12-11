import React from 'react';
import { Col, Container, Row, Form, Button, Modal } from "react-bootstrap";

function Menu(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={false} centered >
            <Modal.Header >
                <Modal.Title >Tic Tac Toe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h5>Join a multiplayer game</h5>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control onChange={props.lobbyID} type="text" name="lobbyID" placeholder="Lobby ID" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button variant="primary" onClick={props.joinLobby} >Join</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <span className="small text-muted" >or</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button variant="secondary" onClick={props.createLobby} >Start a new game</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <span className="small text-muted">By Hana Muzelj</span>
            </Modal.Footer>
        </Modal>
    );
}

export default Menu;
