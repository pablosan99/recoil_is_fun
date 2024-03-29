import {Box, Flex} from '@chakra-ui/react'
import { PropsWithChildren } from 'react';

type Props = {
  onClick: () => void;
} & PropsWithChildren

export const PageContainer = ({onClick, children}: Props) => {
    return (
        <Flex direction="column" onClick={onClick} sx={{
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
