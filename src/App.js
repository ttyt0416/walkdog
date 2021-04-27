import './App.css';
import { useMediaQuery } from 'react-responsive';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.components';

import SideButton from './components/sidebutton/sidebutton.components';
import Header from './components/header/header.components';

const App = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)"
  });

  return (
  <div>
      {isMobile ? <SideButton /> : <Header />}
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
  </div>
  )
}

export default App;