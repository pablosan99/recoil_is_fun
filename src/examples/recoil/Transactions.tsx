import { Box } from '@chakra-ui/react';
import { atomFamily, useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';
import { PropsWithChildren, useEffect } from 'react';

type Product = {
  uid: string;
  name: string;
  price: number;
  props?: Record<string, string|number>;
}

const EmptyProduct: Product = {
  uid: "EMPTY",
  name: "EMPTY",
  price: 0
}

const productAtom = atomFamily<Product, string>({
  key: 'productAtom',
  default: EmptyProduct
}) 

const mockProducts: Product[] = [
  {
    uid: "12376asdASX22",
    name: "t-shirt",
    price: 61.2,
    props: {
      "size": "L"
    }
  },
  {
    uid: "12376asdASXXA",
    name: "t-shirt",
    price: 63.2,
    props: {
      "size": "XL",
      "color": "yellow"
    }
  },
]

type Props = PropsWithChildren;

function TransactionContainer({ children }: Props) {
  
  const fillModel = useRecoilTransaction_UNSTABLE(({ set }) => (products: Product[]) => {
    products.forEach(product => {
      set(productAtom(product.uid), () => product);
    })
  });
  
  useEffect(() => {
    fillModel(mockProducts);
  }, [fillModel])
  
  return (
    <Box>
      {children}
    </Box>
  )
}

type TransactionsViewProps = {
  uid: string;
}

function TransactionsView(props: TransactionsViewProps) {
  const {
    uid
  } = props;
  
  const product = useRecoilValue(productAtom(uid));
  
  return (
    <div>
      transaction 
      <pre>
        {JSON.stringify(product, null, 2)}
      </pre>
    
    </div>  
  )
}

export default function Transaction() {
  return (
    <TransactionContainer>
      <TransactionsView uid={mockProducts[0].uid}/>
      <TransactionsView uid={mockProducts[1].uid}/>
    </TransactionContainer>
  )
}