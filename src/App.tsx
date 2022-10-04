import React, { Suspense, useState } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { ChakraProvider, CircularProgress, Tab, TabList, Tabs } from '@chakra-ui/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AtomEffects } from './examples/AtomEffects';
import { Atoms } from './examples/Atoms';
import { Selectors } from './examples/Selectors';
import { Async } from './examples/Async';
import Transactions from './examples/Transactions';
import Testing from './examples/Testing';
import SampleApp from './examples/SampleApp';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <CircularProgress isIndeterminate color='teal.200' />
        <div>loading ...</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/examples/atoms" element={<Atoms/>}/>
            <Route path="/examples/selectors" element={<Selectors/>}/>
            <Route path="/examples/async" element={<Suspense fallback={<Loader/>}>
              <Async/>
            </Suspense>}/>
            <Route path="/examples/atomEffects" element={<Suspense fallback={<Loader/>}>
              <AtomEffects/>
            </Suspense>}/>
            <Route path={"/examples/transactions"} element={<Transactions/>}/>
            <Route path="/examples/testing" element={<Testing/>}/>
            <Route path={"/examples/app"} element={<SampleApp/>}/>
            <Route path={"/"} element={<Atoms/>}/>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  )
}


function Header() {
  const [tabIdx, setTabIdx] = useState(0);

  const handleChange = (index: number) => {
    setTabIdx(index);
  }
  return (
    <Tabs variant="enclosed-colored" index={tabIdx} onChange={handleChange}>
      <TabList>
        <Tab>
          <Link to="/examples/atoms">Atoms</Link>
        </Tab>
        <Tab>
          <Link to="/examples/selectors">Selectors</Link>
        </Tab>
        <Tab>
          <Link to="/examples/async">Async selectors</Link>
        </Tab>
        <Tab>
          <Link to="/examples/atomEffects">Atom effects</Link>
        </Tab>
        <Tab>
          <Link to="/examples/transactions">Transactions</Link>
        </Tab>
        <Tab>
          <Link to="/examples/testing">Testing</Link>
        </Tab>
        <Tab>
          <Link to="/examples/app">App</Link>
        </Tab>
      </TabList>
    </Tabs>
  )
}

export default App;
