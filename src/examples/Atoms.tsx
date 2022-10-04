import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { Box, Checkbox, Grid, GridItem } from '@chakra-ui/react';

export const selectedItem = atom<boolean>({
  key: 'selectedItem',
  default: false,
})

const Switch = () => {
  const [selected, setSelected] = useRecoilState(selectedItem)

  return (
    <Box padding={4}>
      <Checkbox
        isChecked={selected}
        onChange={(e) => setSelected(e.target.checked)}
      >
        Click me if you can
      </Checkbox>
    </Box>
  )
}

export const RightContainer = () => {
  const selected = useRecoilValue(selectedItem)

  return (
    <Box sx={{ 
      height: '100%',
      backgroundColor: selected ? 'burlywood' : 'transparent',
      color: selected ? 'brown' : 'black',
    }}>
      Right container
    </Box>
  )
}

export const Atoms = () => {
  return (
    <Grid templateColumns="25% auto 25%" h="400px" gap={2} border={1} padding={4}>
      <GridItem bg='blackAlpha.50' >
        <Switch/>
      </GridItem>
      <GridItem bg='papayawhip' />
      <GridItem bg='blackAlpha.50' >
        <RightContainer/>
      </GridItem>
    </Grid>
  )
}
