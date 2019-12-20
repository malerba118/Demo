import React from "react";
import { useDialog } from "../hooks";
import Dialog from "@material-ui/core/Dialog";

// Modal
const DialogWithTrigger = ({ trigger, children }) => {
  const dialog = useDialog(false);
  return (
    <>
      {trigger(dialog)}
      <Dialog open={dialog.isOpen} onClose={dialog.close}>
        {children}
      </Dialog>
    </>
  );
};

export default DialogWithTrigger