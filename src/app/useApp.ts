import {useContext} from 'react';
import {Context} from './Context';

export const useApp = () => useContext(Context);