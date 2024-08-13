import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { renameNode } from "../../../api/Node/renameNode";
import { useObserver } from "../../../hooks/useObserver";
import s from "../BaseModal/BaseModal.module.css";

export const RENAME_NODE_EVENT_NAME = "RENAME_NODE_EVENT";

const RenameNode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const [newName, setNewName] = useState("");

  const handleModalClose = () => setIsOpen(false);
  const handleModalTrigger = (details) => {
    const id = details.detail?.nodeId;

    if (!id) throw new Error("Node ID not received");
    setIsOpen(true);
    setNodeId(id);
  };
  const handleRename = () => {
    if (!newName) return;

    renameNode(nodeId, newName).finally(() => {
      handleModalClose();
      location.reload();
    });
  };

  useObserver(RENAME_NODE_EVENT_NAME, handleModalTrigger);

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <form className={s.baseModal} onSubmit={handleRename}>
        <Typography variant="h6" component="h2">
          Rename
        </Typography>
        <Input
          required
          placeholder="New name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <Box>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="submit">Rename</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default RenameNode;
