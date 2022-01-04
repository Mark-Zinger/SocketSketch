import {useCallback} from 'react';

import throttle from '../helpers/throttle';

export default function useThrottle (func, interval=500, dependencies=[]) {
    return useCallback(throttle(func, interval),dependencies)
}
