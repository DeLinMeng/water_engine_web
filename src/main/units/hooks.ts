import {
  useCallback,
  useMemo,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { isFunction } from "lodash";

export const useMixedState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);
  const ref = useRef(initialValue);
  const set = useCallback((val: T) => {
    if (isFunction(val)) {
      ref.current = val(ref.current);
    } else {
      ref.current = val;
    }
    setState(val);
  }, []);
  const refBehindProxy = useMemo(
    () =>
      new Proxy(ref, {
        set: () => {
          throw new Error(
            "Do not change value of this ref, it's readonly. Instead, use the set method."
          );
        },
      }),
    []
  );
  return [state, set, refBehindProxy] as [
    typeof state,
    Dispatch<SetStateAction<T>>,
    {
      readonly current: T;
    }
  ];
};
