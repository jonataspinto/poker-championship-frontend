import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode
} from "react";
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions } from '@material-ui/core';

interface IDialogActions {
  agree: () => void,
  disAgree: () => void
}

interface IModalContext {
  showModal: (content: ReactNode, actions: IDialogActions) => void;
  closeModal: () => void;
  isOpen: boolean
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<> </>);
  const [dialogActions, setDialogAction] = useState<{
    actions: IDialogActions
  }>({
    actions: {
      agree: () => {},
      disAgree: () => {}
    }
  })

  useEffect(() => {

  }, []);

  const showModal = (
    content: ReactNode,
    actions: IDialogActions
  ) => {
    setModalContent(content);
    setDialogAction({
      actions
    })
    setIsOpen(true);
  };

  const closeModal = useCallback(async () => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
        isOpen
      }}
    >
      {children}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {modalContent}
        <DialogActions>
          <Button
            onClick={() => {
              dialogActions.actions.disAgree()
              closeModal();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              dialogActions.actions.agree();
              closeModal();
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
};

function useModal(): IModalContext {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
}

export { ModalProvider, useModal };
