import React from 'react';
import { Group, Shape } from 'react-konva';

function Cross(props) {
    const padding = 10;

    return (
        <Group x={props.x} y={props.y} >
            <Shape
                sceneFunc={(context, shape) => {
                    context.moveTo(0 + padding, 0 + padding);
                    context.lineTo(props.size - padding, props.size - padding);

                    context.moveTo(props.size - padding, 0 + padding);
                    context.lineTo(0 + padding, props.size - padding);

                    context.fillStrokeShape(shape);
                }}
                stroke="#181A18"
                strokeWidth={8}
            />
        </Group>
    );
}

export default Cross;
