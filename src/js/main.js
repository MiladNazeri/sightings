import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './config/routes.js';
import reducers from './reducers';

const history = createBrowserHistory();
const createFinalStore = applyMiddleware(thunk, promise)(createStore);

ReactDOM.render(
    <Provider store={createFinalStore(reducers)}>
       <Router history={history} routes={routes} />
    </Provider>,
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
