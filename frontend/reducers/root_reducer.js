import { combineReducers } from 'redux';

import UIReducer from './ui_reducer';
import SessionReducer from './session_reducer';
import EntitiesReducer from './entities_reducer';

const RootReducer = combineReducers({
  ui: UIReducer,
  session: SessionReducer,
  entities: EntitiesReducer
});

export default RootReducer;
