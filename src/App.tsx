import React, { Suspense, useState } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { ChakraProvider, Tab, TabList, Tabs } from '@chakra-ui/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AtomEffects } from './examples/AtomEffects';
import { Atoms } from './examples/Atoms';
import { Selectors } from './examples/Selectors';
import { Async } from './examples/Async';
import Canvas from './Canvas';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/examples/atoms" element={<Atoms />} />
            <Route path="/examples/selectors" element={<Selectors/>}/>
            <Route path="/examples/async" element={<Suspense fallback={<div>Loading...</div>}>
              <Async/>
            </Suspense>}/>
            <Route path="/examples/atomEffects" element={<Suspense fallback={<div>Loading...</div>}>
              <AtomEffects/>
            </Suspense>}/>
            <Route path={"/examples/app"} element={<Canvas/>}/>
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
          <Link to="/examples/atomEffects">Transactions</Link>
        </Tab>
        <Tab>
          <Link to="/examples/testing">Testing</Link>
        </Tab>
        
        <Tab>
          <Link to="/examples/app">All</Link>
        </Tab>
      </TabList>
    </Tabs>
  )
}

export default App;
