import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change'

const AppStore = Object.assign(EventEmitter.prototype, {
    emitChange(){
        this.emit( CHANGE_EVENT )
    },
    addChangeListener( callback ) {
        this.on( CHANGE_EVENT, callback )
    },
    removeChangeListener( callback ) {
        this.removeListener( CHANGE_EVENT, callback )
    },
    dispatcherIndex: register( function( action ) {
        switch(action.actionType){
            case AppConstants.ADD_ITEM:
                    CartAPI.addItem( action.item );
                    break;
        }
        AppStore.emitChange();
    })
});

export default AppStore;