import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './config/routes.js';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>{routes}</Router>,
  document.getElementById('main')
)



// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}>
//       <IndexRoute component={User}/>
//       <Route name="pro" path="pro" component={Pro} />
//     </Route>
//   </Router>
// ), document.getElementById(''));
