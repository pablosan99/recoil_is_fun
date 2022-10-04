import {DraggableCore} from 'react-draggable'
import {ElementStyle} from './Rectangle/Rectangle'
import { PropsWithChildren } from 'react';

type DragProps = {
    position: ElementStyle['position']
    onDrag: (position: ElementStyle['position']) => void
} & PropsWithChildren

export const Drag = ({position, onDrag, children}: DragProps) => {
    return (
        <DraggableCore
            onDrag={(e: any) => {
                onDrag({
                    left: e.movementX + position.left,
                    top: e.movementY + position.top,
                })
            }}
        >
            {children}
        </DraggableCore>
    )
}
