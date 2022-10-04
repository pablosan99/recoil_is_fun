import {Box, Flex} from '@chakra-ui/react'
import { PropsWithChildren } from 'react';

type PageContainerProps = {
  onClick: () => void;
} & PropsWithChildren

export const PageContainer = ({onClick, children}: PageContainerProps) => {
    return (
        <Flex direction="column" width="100vw" height="100vh" onClick={onClick}>
            <Box flex={1} position="relative">
                {children}
            </Box>
        </Flex>
    )
}
