import React from "react";
import { Group, Layer, Shape, Stage } from 'react-konva';
import Board from "./Gameboard/Board";
import Cross from "./Gameboard/Cross";
import Circle from "./Gameboard/Circle";

function Game(props) {
    const size = 600;
    const padding = 30;

    const click = (e) => {
        let stage = e.currentTarget;
        let pos = stage.getPointerPosition();
        let x = Math.floor(pos.x / (size / 3));
        let y = Math.floor(pos.y / (size / 3));
        props.move({ x: x, y: y });
    }

    const drawPieces = () => {
        let game = props.game.game;
        if (game.gameBoard) {
            return (
                game.gameBoard.map((row, y) => {
                    return row.map((piece, x) => {
                        if (piece == "CROSS") {
                            return <Cross size={size / 3} x={x * size / 3} y={y * size / 3} />
                        } else if (piece == "CIRCLE") {
                            return <Circle size={size / 3} x={x * size / 3} y={y * size / 3} />;
                        }
                        return <></>;
                    })
                })
            );
        }
    }

    const drawFinishLine = () => {
        if (props.game.state == "DONE" && props.game.game.gameBoard) {
            let gameBoard = props.game.game.gameBoard;


            for (let row = 0; row < gameBoard.length; row++) {
                if (gameBoard[row][0] == gameBoard[row][1] &&
                    gameBoard[row][1] == gameBoard[row][2] &&
                    gameBoard[row][0] != "EMPTY") {
                    return (
                        <Shape
                            sceneFunc={(context, shape) => {
                                context.moveTo(0 + padding, size / 3 * row + size / 6);
                                context.lineTo(size - padding, size / 3 * row + size / 6);

                                context.fillStrokeShape(shape);
                            }}
                            stroke="#94B447"
                            strokeWidth={15}
                        />
                    );
                }
            }
            for (let column = 0; column < gameBoard.length; column++) {
                if (gameBoard[0][column] == gameBoard[1][column] &&
                    gameBoard[1][column] == gameBoard[2][column] &&
                    gameBoard[0][column] != "EMPTY") {
                    return (
                        <Shape
                            sceneFunc={(context, shape) => {
                                context.moveTo(size / 3 * column + size / 6, 0 + padding);
                                context.lineTo(size / 3 * column + size / 6, size - padding);

                                context.fillStrokeShape(shape);
                            }}
                            stroke="#94B447"
                            strokeWidth={15}
                        />
                    );
                }
            }
            if (gameBoard[0][0] == gameBoard[1][1] &&
                gameBoard[1][1] == gameBoard[2][2] &&
                gameBoard[0][0] != "EMPTY") {
                return (
                    <Shape
                        sceneFunc={(context, shape) => {
                            context.moveTo(0 + padding, 0 + padding);
                            context.lineTo(size - padding, size - padding);

                            context.fillStrokeShape(shape);
                        }}
                        stroke="#94B447"
                        strokeWidth={15}
                    />
                );
            }
            if (gameBoard[2][0] == gameBoard[1][1] &&
                gameBoard[1][1] == gameBoard[0][2] &&
                gameBoard[2][0] != "EMPTY") {
                return (
                    <Shape
                        sceneFunc={(context, shape) => {
                            context.moveTo(size - padding, 0 + padding);
                            context.lineTo(0 + padding, size - padding);

                            context.fillStrokeShape(shape);
                        }}
                        stroke="#94B447"
                        strokeWidth={15}
                    />
                );
            }
            for (let y = 0; y < gameBoard.length; y++) {
                for (let x = 0; x < gameBoard.length; x++) {
                    if (gameBoard[y][x] == "EMPTY") {
                        
                    }
                }
            }
        }
    }

    return (
        <Stage width={size} height={size} onClick={click} >
            <Board size={size} />
            <Layer>
                {drawPieces()}
            </Layer>
            <Layer>
                {drawFinishLine()}
            </Layer>
        </Stage>
    );
}

export default Game;
