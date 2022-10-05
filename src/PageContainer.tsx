import {Box, Flex} from '@chakra-ui/react'
import { PropsWithChildren } from 'react';

type PageContainerProps = {
  onClick: () => void;
} & PropsWithChildren

export const PageContainer = ({onClick, children}: PageContainerProps) => {
    return (
        <Flex direction="column" onClick={onClick} sx={{
          border: `1px solid red`,
          margin: `10px`,
          width: `95%`,
          height: `590px`
        }}>
            <Box flex={1} position="relative">
                {children}
            </Box>
        </Flex>
    )
}
