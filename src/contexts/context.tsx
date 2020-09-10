import {createContext} from 'react';
import {RecordAction} from '../hooks/useRecords';
import {TagAction} from '../hooks/useTags';
type ContextAction = RecordAction & TagAction
const RecordContext = createContext<RecordAction>({} as ContextAction)

export default RecordContext