import { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";
import { ElementStyle } from "./Rectangle/Rectangle";
import { PropsWithChildren } from "react";

type DragProps = {
  position: ElementStyle["position"];
  onDragFn: (position: ElementStyle["position"]) => void;
} & PropsWithChildren;

export const Drag = (props: DragProps) => {
  const { position, onDragFn, children } = props;
  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {};

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {};

  return (
    <DraggableCore
      onStart={handleDragStart}
      onStop={handleDragStop}
      onDrag={(e: DraggableEvent, data: DraggableData) => {
        const event = e as MouseEvent
        onDragFn({
          left: event.movementX + position.left,
          top: event.movementY + position.top
        });
      }}
    >
      {children}
    </DraggableCore>
  );
};
