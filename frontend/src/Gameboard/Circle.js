import React from 'react';
import { Circle as KonvaCircle, Group } from 'react-konva';

function Circle(props) {
    const padding = 20;

    return (
        <Group x={props.x} y={props.y} >
            <KonvaCircle
                x={props.size / 2}
                y={props.size / 2}
                radius={props.size / 2 - padding}
                stroke="#181A18"
                strokeWidth={8}
            />
        </Group>
    );
}

export default Circle;
