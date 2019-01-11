
import { Store } from 'redux';
import { AppState } from './types';
import nodes from './nodes';

export function run(store: Store<AppState>) {
 console.log('nodes', nodes);
}
