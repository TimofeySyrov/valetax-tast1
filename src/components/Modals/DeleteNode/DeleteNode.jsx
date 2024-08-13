import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { deleteNode } from "../../../api/Node/deleteNode";
import { useObserver } from "../../../hooks/useObserver";
import s from "../BaseModal/BaseModal.module.css";

export const DELETE_NODE_EVENT_NAME = "DELETE_NODE_EVENT";

const DeleteNode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState("");

  const handleModalClose = () => setIsOpen(false);
  const handleModalTrigger = (details) => {
    console.log("aboba");
    const id = details.detail?.nodeId;

    if (!id) throw new Error("Node ID not received");
    setIsOpen(true);
    setNodeId(id);
  };
  const handleDelete = () => {
    if (!nodeId) return;

    deleteNode(nodeId).finally(() => {
      handleModalClose();
      location.reload();
    });
  };

  useObserver(DELETE_NODE_EVENT_NAME, handleModalTrigger);

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <form className={s.baseModal} onSubmit={handleDelete}>
        <Typography variant="h6" component="h2">
          Delete
        </Typography>
        <Box>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default DeleteNode;
