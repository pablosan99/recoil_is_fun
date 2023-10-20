import React, { Suspense, useRef } from "react";
import { atom, atomFamily, useRecoilState } from "recoil";
import { Resize } from "../Resize";
import { RectangleContainer } from "./RectangleContainer";
import { RectangleInner } from "./RectangleInner";
import { RectangleLoading } from "./RectangleLoading";
import { Drag } from '../Drag';

export type ElementStyle = {
  position: { top: number; left: number };
  size: { width: number; height: number };
};

export type Element = {
  style: ElementStyle;
  image?: { src: string; id: number };
};

export const defaultStyle = {
  position: {top: 200, left: 200},
  size: {width: 200, height: 200}
};

export const elementState = atomFamily<Element, number>({
  key: "element",
  default: {
    style: defaultStyle
  }
});

export const selectedElementState = atom<number | null>({
  key: "selectedElement",
  default: null
});

type Props = {
  id: number;
}

export const Rectangle = ({id}: Props) => {
  const [element, setElement] = useRecoilState(elementState(id));
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState);
  const divRef = useRef<HTMLDivElement | null>(null);

  const selected = selectedElement === id;

  const handleDrag = (position: ElementStyle["position"]) => {
    setElement({
      ...element,
      style: {
        ...element.style,
        position
      }
    });
  }

  const handleResize = (_element: ElementStyle) => {
    setElement({
      ...element,
      style: {
        ..._element
      }
    })
  }

  return (
    <RectangleContainer
      position={element.style.position}
      size={element.style.size}
      onSelect={() => {
        setSelectedElement(id);
      }}
    >
      <Resize
        selected={selected}
        position={element.style.position}
        size={element.style.size}
        onResizeFn={handleResize}
        lockAspectRatio={element.image !== undefined}
      >
        <Drag
          position={element.style.position}
          onDragFn={handleDrag}
        >
          <div ref={divRef}>
            <Suspense fallback={<RectangleLoading selected={selected}/>}>
              <RectangleInner selected={selected} id={id}/>
            </Suspense>
          </div>
        </Drag>
      </Resize>
    </RectangleContainer>
  );
};
