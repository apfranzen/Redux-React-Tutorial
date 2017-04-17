import { applyMiddleware, createStore } from "redux";

const reducer = (initialState, action) => {
  if (action.type === "INC") {
    return initialState+1;
  } else if (action.type === "DEC") {
    return initialState-1;
  }
  return initialState
}

const logger = (store) => (next) => (action) => {
  console.log('action fired', action);
  next(action);
};

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    console.log('AAAHHH', e);
  }
}

const middleware = applyMiddleware(logger);

const store = createStore(reducer, 0, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
})

store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "DEC", payload: 2})
