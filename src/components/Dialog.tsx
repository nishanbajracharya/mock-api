import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button, { ButtonProps } from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

type MUIDialogProps = {
  open: boolean;
  handleSuccess: () => any;
  cancelButtonProps?: ButtonProps;
  handleClose: (event: any) => any;
  successButtonProps?: ButtonProps;
  dialogText?: string | React.ReactElement;
  dialogTitle: string | React.ReactElement;
  cancelButtonText: string | React.ReactElement;
  successButtonText: string | React.ReactElement;
};

function MUIDialog(props: MUIDialogProps) {
  return <Dialog
    open={props.open}
    onClose={props.handleClose}
  >
    <DialogTitle>{props.dialogTitle}</DialogTitle>
    {props.dialogText && <DialogContent>
      <DialogContentText>{props.dialogText}</DialogContentText>
    </DialogContent>}
    <DialogActions>
      <Button onClick={props.handleClose} color="primary" {...props.cancelButtonProps}>
        {props.cancelButtonText}
      </Button>
      <Button onClick={props.handleSuccess} color="primary" {...props.successButtonProps}>
        {props.successButtonText}
      </Button>
    </DialogActions>
  </Dialog>
}

export default MUIDialog;