import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { postNode } from "../../../api/Node/postNode";
import { useObserver } from "../../../hooks/useObserver";
import s from "../BaseModal/BaseModal.module.css";

export const CREATE_NODE_EVENT_NAME = "CREATE_NODE_EVENT";

const CreateNode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [parentNodeId, setParentNodeId] = useState("");
  const [newName, setNewName] = useState("");

  const handleModalClose = () => setIsOpen(false);
  const handleModalTrigger = (details) => {
    const parentId = details.detail?.parentNodeId;

    if (!parentId) throw new Error("Parent node ID not received");
    setIsOpen(true);
    setParentNodeId(parentId);
  };
  const handleCreate = () => {
    if (!newName) return;
    postNode(parentNodeId, newName).finally(() => {
      handleModalClose();
      location.reload();
    });
  };

  useObserver(CREATE_NODE_EVENT_NAME, handleModalTrigger);

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <Box className={s.baseModal}>
        <Typography variant="h6" component="h2">
          Add
        </Typography>
        <Input
          required
          placeholder="Name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <Box>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleCreate}>Add</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateNode;
