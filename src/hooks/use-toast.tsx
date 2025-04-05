
import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import type { 
  ToastActionElement, 
  ToastProps 
} from "@/components/ui/toast";

type ToastType = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastType & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId
              ? {
                  ...t,
                  open: false,
                }
              : t
          ),
        };
      }
      
      return {
        ...state,
        toasts: state.toasts.map((t) => ({
          ...t,
          open: false,
        })),
      };
    }
    
    case "REMOVE_TOAST": {
      const { toastId } = action;
      
      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== toastId),
        };
      }
      
      return {
        ...state,
        toasts: [],
      };
    }
  }
};

const ToastContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { toasts: [] },
  dispatch: () => null,
});

function useToaster() {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  return {
    state,
    dispatch,
  };
}

export const useToast = () => {
  const { dispatch } = useContext(ToastContext);

  function toast({
    ...props
  }: Omit<ToasterToast, "id">) {
    const id = genId();

    const update = (props: ToasterToast) =>
      dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      });

    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss();
        },
      },
    });

    return {
      id,
      dismiss,
      update,
    };
  }

  // Return the context state along with the toast function
  const { state } = useContext(ToastContext);
  return { toast, state };
};

// Export a standalone toast function, but not used in Toaster component
export const toast = ({ ...props }: Omit<ToasterToast, "id">) => {
  const { toast } = useToast();
  return toast(props);
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useToaster();

  useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.open === false && !toastTimeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          toastTimeouts.delete(toast.id);
          dispatch({
            type: "REMOVE_TOAST",
            toastId: toast.id,
          });
        }, TOAST_REMOVE_DELAY);

        toastTimeouts.set(toast.id, timeout);
      }
    });
  }, [state.toasts, dispatch]);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
}
