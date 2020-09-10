import {createContext} from 'react';
import {RecordAction} from '../hooks/useRecords';
import {TagAction} from '../hooks/useTags';
type ContextAction = TagAction & RecordAction

const Context = createContext<ContextAction>({} as ContextAction)

export default Context