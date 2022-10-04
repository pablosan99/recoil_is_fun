import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  NumberInput,
  NumberInputField,
  Switch,
} from '@chakra-ui/react'
import { ArrowRight } from 'react-feather'
import { atom, DefaultValue, selector, useRecoilState, useRecoilValue } from 'recoil'
import { selectedItem } from './Atoms'
import { FunctionComponent, PropsWithChildren } from 'react';

const exchangeRate = 0.8

const usdAtom = atom<number>({
    key: 'usd',
    default: 1,
})

const eurSelector = selector<number>({
    key: 'eur',
    get: ({get}) => {
        let usd = get(usdAtom)

        const commissionEnabled = get(commissionEnabledAtom)
        if (commissionEnabled) {
            const commission = get(commissionAtom)
            usd = removeCommission(usd, commission)
        }

        return usd * exchangeRate
    },
    set: ({set, get, reset}, newEurValue) => {
        if (newEurValue instanceof DefaultValue) {
          newEurValue = 10;
        }
        let newUsdValue = newEurValue / exchangeRate

        const commissionEnabled = get(commissionEnabledAtom)
        if (commissionEnabled) {
            const commission = get(commissionAtom)
            newUsdValue = addCommission(newUsdValue, commission)
        }

        set(usdAtom, newUsdValue)
    },
})

export const Selectors = () => {
    const [usd, setUSD] = useRecoilState(usdAtom)
    const [eur, setEUR] = useRecoilState(eurSelector)
    const selected = useRecoilValue(selectedItem)

    return (
        <Box sx={{
          padding: `20px`,
          margin: `20px`,
          border: `1px dotted blue`,
          backgroundColor: selected ? 'lightyellow' : 'white'
        }}>
            <Heading size="lg" mb={2}>
                Currency Converter (exchange rate {exchangeRate})
            </Heading>
            <InputStack>
                <CurrencyInput label="usd" amount={usd} onChange={(usd) => setUSD(usd)} />
                <CurrencyInput label="eur" amount={eur} onChange={(eur) => setEUR(eur)} />
            </InputStack>
            <Commission />
        </Box>
    )
}

type InputStackProps = PropsWithChildren
const InputStack: FunctionComponent<InputStackProps> = ({children}: InputStackProps) => {
    return (
        <HStack
            width="300px"
            mb={4}
            spacing={4}
            divider={
                <Box border="1" height="40px" alignItems="center" display="flex">
                    <Icon as={ArrowRight} />
                </Box>
            }
            align="flex-end"
        >
            {children}
        </HStack>
    )
}

const CurrencyInput = ({
    amount,
    onChange,
    label,
}: {
    label: string
    amount: number
    onChange?: (amount: number) => void
}) => {
    let symbol = label === 'usd' ? '$' : '€'

    return (
        <FormControl id={label.toUpperCase()}>
            <FormLabel>{label.toUpperCase()}</FormLabel>
            <NumberInput
                value={`${symbol} ${amount}`}
                onChange={(value) => {
                    const withoutSymbol = value.split(' ')[0]
                    onChange?.(parseFloat(withoutSymbol || '0'))
                }}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
    )
}

const commissionEnabledAtom = atom({
    key: 'commissionEnabled',
    default: false,
})

const commissionAtom = atom({
    key: 'commission',
    default: 5,
})

const Commission = () => {
    const [enabled, setEnabled] = useRecoilState(commissionEnabledAtom)
    const [commission, setCommission] = useRecoilState(commissionAtom)

    return (
        <Box width="300px">
            <FormControl display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="includeCommission" mb="0">
                    Include commission in %?
                </FormLabel>
                <Switch
                    id="includeCommission"
                    isChecked={enabled}
                    onChange={(event) => setEnabled(event.currentTarget.checked)}
                />
            </FormControl>
            <NumberInput
                isDisabled={!enabled}
                value={commission}
                onChange={(value) => setCommission(parseFloat(value || '0'))}
            >
                <NumberInputField />
            </NumberInput>
        </Box>
    )
}

const addCommission = (amount: number, commission: number) => {
    return amount / (1 - commission / 100)
}

const removeCommission = (amount: number, commission: number) => {
    return amount * (1 - commission / 100)
}
