import { atom, useRecoilState } from 'recoil';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const nameAtom = atom({
  key: 'nameAtom',
  default: '',
});

export function Form() {
  const [name, setName] = useRecoilState(nameAtom);
  return (
    <form>
      <input
        data-testid="name_input"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </form>
  );
}

export default function Testing() {
  return (
    <Box p={4}>
      <Link to="https://recoiljs.org/docs/guides/testing">https://recoiljs.org/docs/guides/testing</Link>
      
      <iframe src="https://recoiljs.org/docs/guides/testing" width={1700} height={900} />
    </Box>
  )
}