import { Box } from '@chakra-ui/react'
import { ElementStyle } from './Rectangle'
import { PropsWithChildren } from 'react';

type RectangleContainerProps = {
    position: ElementStyle['position']
    size: ElementStyle['size']
    onSelect: () => void
} & PropsWithChildren

export const RectangleContainer = ({children, size, position, onSelect}: RectangleContainerProps) => {
    return (
        <Box
            position="absolute"
            style={{...size, ...position}}
            onMouseDown={() => onSelect()}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </Box>
    )
}
