import { State as NodesState } from './nodes/reducer';

export interface AppState {
    nodes: NodesState;
    router: any;
}