import { useState } from "react";

const useDialog = defaultVal => {
  const [dialogOpen, setDialogOpen] = useState(defaultVal);
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  return {
    open: openDialog,
    close: closeDialog,
    isOpen: dialogOpen
  };
};

export default useDialog;
