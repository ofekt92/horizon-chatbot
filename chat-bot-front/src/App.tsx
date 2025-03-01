import { Route, Switch } from 'wouter'
import './App.css'
import { Chat } from './features/chat/chat'
import { Landing } from './features/landing/landing'
import { Header } from './layout/header/header'
import { DrawerMenu } from './layout/drawer/drawer'
import { useState } from 'react'
import { SessionsPersistenceProvider } from './context/sessionsPersistenceContext'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);


  return (
    <>
      <SessionsPersistenceProvider>
        <Header toggleOpen={toggleMenu} />
        <DrawerMenu isOpen={isOpen} toggleOpen={toggleMenu} />
        <main>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/chat/:sessionId" component={Chat} />
            <Route>404 - Not Found!</Route>
          </Switch>
        </main>
      </SessionsPersistenceProvider>
    </>
  )
}

export default App