import { ResizableBox, ResizeCallbackData, ResizeHandle } from 'react-resizable'
import { Handle } from './Handle'
import { ElementStyle } from './Rectangle/Rectangle'
import * as React from 'react';
import { PropsWithChildren } from 'react';

const handlePlacements: ResizeHandle[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

type ResizeProps = {
  selected: boolean
  onResizeFn: (style: ElementStyle) => void
  lockAspectRatio: boolean
} & ElementStyle & PropsWithChildren

export const Resize = (props: ResizeProps) => {
  const {
    selected,
    children, position,
    size, onResizeFn,
    lockAspectRatio
  } = props;

  function handleResizeStart(e: React.SyntheticEvent, data: ResizeCallbackData) {
    console.log('handle resize start', data);
  }

  function handleResize(e: React.SyntheticEvent, data: ResizeCallbackData) {
    const {size: newSize, handle} = data;

    let topDiff = 0
    if (handle.includes('n')) {
      topDiff = size.height - newSize.height
    }

    let leftDiff = 0
    if (handle.includes('w')) {
      leftDiff = size.width - newSize.width
    }

    onResizeFn({
      size: {
        width: Math.round(newSize.width),
        height: Math.round(newSize.height),
      },
      position: {
        top: position.top + topDiff,
        left: position.left + leftDiff,
      },
    });
  }

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      axis="both"
      resizeHandles={handlePlacements}
      handle={(placement, ref) => {
        return (
          <div ref={ref} style={{width: size.width + 'px', height: size.height + 'px'}}>
            <Handle placement={placement} visible={selected}/>
          </div>
        )
      }}
    >
      {children}
    </ResizableBox>
  )
}
