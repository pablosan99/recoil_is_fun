import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'
import {ElementStyle} from './Rectangle/Rectangle'
import { PropsWithChildren } from 'react';

type DragProps = {
    position: ElementStyle['position']
    onDrag: (position: ElementStyle['position']) => void
} & PropsWithChildren

export const Drag = ({position, onDrag, children}: DragProps) => {
    return (
        <DraggableCore
            onDrag={(e: DraggableEvent,
                     data: DraggableData) => {
                console.log(e, data);
                onDrag({
                    left: data.x + position.left,
                    top: data.y + position.top,
                })
            }}
        >
            {children}
        </DraggableCore>
    )
}
