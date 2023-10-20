import React, { Suspense, useState } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { Box, ChakraProvider, CircularProgress, Tab, TabList, Tabs } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AtomEffects } from './examples/recoil/AtomEffects';
import { Atoms } from './examples/recoil/Atoms';
import { Selectors } from './examples/recoil/Selectors';
import { Async } from './examples/recoil/Async';
import Transactions from './examples/recoil/Transactions';
import Testing from './examples/recoil/Testing';
import SampleApp from './examples/recoil/SampleApp';
import Start from './examples/recoil/Start';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <CircularProgress isIndeterminate color='teal.200'/>
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
            <Route path={"/"} element={<Start/>}/>
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
    <Box display="flex" justifyContent="space-between">
      <Box p={3}>
        <Text fontSize="2xl" color="blue.500">Recoil</Text>
      </Box>
      <Tabs variant="enclosed-colored" align="end" index={tabIdx} onChange={handleChange}>
        <TabList>
          <Tab>
            <Link to="/">Start</Link>
          </Tab>
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
    </Box>
  )
}

export default App;
