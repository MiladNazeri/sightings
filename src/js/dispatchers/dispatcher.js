import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

export function register( callback ) {
    return AppDispatcher.register( callback );
}

export function dispatch( actionType, action ){
    console.log(actionType)
    AppDispatcher.dispatch( actionType, action );
}

