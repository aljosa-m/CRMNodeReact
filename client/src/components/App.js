import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import HeaderBar from './HeaderBar'
const Contacts = () => <h2>Contacts</h2>
const Accounts = () => <h2>Accounts</h2>
const Landing = () => <h2>Landing</h2>


const App = () => {
  return(
    <div>
      <BrowserRouter>
        <div>
          <HeaderBar />
          <div className="container">
            <Route path="/contacts" component={Contacts} />
            <Route path="/accounts" component={Accounts} />
            <Route exact path="/" component={Landing} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
