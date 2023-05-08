import React from "react";

//--- Material UI
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";

//--- Others
import {
  useGetConfirmModalState,
  useSetConfirmModalState,
} from "sites/mogivi/redux/confirmModal.slice";
import ButtonMG from "../ButtonMG";
import { HIDDEN_CONFIRM_ACTION_ID } from "sites/mogivi/const/vr360";

export default function ConfirmModal() {
  const { open, message, modalTitle } = useGetConfirmModalState();
  const { closeConfirmModal } = useSetConfirmModalState();

  const handleAccept = () => {
    document.getElementById(HIDDEN_CONFIRM_ACTION_ID)?.click();
    closeConfirmModal();
  };

  if (!open) return null;

  return (
    <Dialog
      open
      onClose={closeConfirmModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box textAlign="center">{modalTitle}</Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ButtonMG
              onClick={closeConfirmModal}
              className="w-100"
              color="primary"
            >
              Hủy bỏ
            </ButtonMG>
          </Grid>
          <Grid item xs={6}>
            <ButtonMG onClick={handleAccept} className="w-100">
              Đồng ý
            </ButtonMG>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
