import { RecoilRoot, RecoilValue, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form, nameAtom } from './Testing';

type RecoilObserverProps = {
  node: RecoilValue<string>,
  onChange: (value: unknown) => void;
}

export const RecoilObserver = ({node, onChange}: RecoilObserverProps) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

describe('The form state should', () => {
  test('change when the user enters a name.', () => {
    const onChange = jest.fn();

    render(
      <RecoilRoot>
        <RecoilObserver node={nameAtom} onChange={onChange} />
        <Form />
      </RecoilRoot>,
    );

    const component = screen.getByTestId('name_input');

    fireEvent.change(component, {target: {value: 'Recoil'}});

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(''); // Initial state on render.
    expect(onChange).toHaveBeenCalledWith('Recoil'); // New value on change.
  });
});