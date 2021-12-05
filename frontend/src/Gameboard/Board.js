import React from 'react';
import { Layer, Shape, } from 'react-konva';

function Board(props) {
    return (
        <Layer x={0} y={0} >
            <Shape
                sceneFunc={(context, shape) => {
                    context.moveTo(props.size / 3, 0);
                    context.lineTo(props.size / 3, props.size);

                    context.moveTo(props.size / 3 * 2, 0);
                    context.lineTo(props.size / 3 * 2, props.size);

                    context.moveTo(0, props.size / 3);
                    context.lineTo(props.size, props.size / 3);

                    context.moveTo(0, props.size / 3 * 2);
                    context.lineTo(props.size, props.size / 3 * 2);

                    context.fillStrokeShape(shape);
                }}
                stroke="#3f3f3f"
                strokeWidth={6}
            />
        </Layer>
    );
}

export default Board;
