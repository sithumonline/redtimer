import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Post from "./Post";
import Read from "./Read";

const hist = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route path="/post/:id" component={Read} />
          <Route path="/post" component={Post} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
