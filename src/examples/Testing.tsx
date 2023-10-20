import { atom, useRecoilState } from 'recoil';
import { Box, Image } from '@chakra-ui/react';
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
    <Box p={4} display="flex" flexDirection="column" alignItems="center" gap={4}>
      <Image src="/assets/show_me_the_code.jpeg" alt="Show me the code" width={700} height={400}/>
      <Box mt={96}>
        <Link to="https://recoiljs.org/docs/guides/testing">https://recoiljs.org/docs/guides/testing</Link>
      </Box>
      <Box mt={96}>
        <iframe title="recoil page" src="https://recoiljs.org/docs/guides/testing" width={1700} height={900} />
      </Box>
    </Box>
  )
}