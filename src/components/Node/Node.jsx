import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import triggerCustomEvent from "../../utils/triggerCustomEvent";
import { CREATE_NODE_EVENT_NAME } from "../Modals/CreateNode/CreateNode";
import { DELETE_NODE_EVENT_NAME } from "../Modals/DeleteNode/DeleteNode";
import { RENAME_NODE_EVENT_NAME } from "../Modals/RenameNode/RenameNode";
import s from "./Node.module.css";

const Node = ({ isRootNode, node, childrenNodes }) => {
  const [isChildrenShown, setIsChildrenShown] = useState(false);
  const hasChildren = childrenNodes?.length;
  const cx = classNames.bind(s);

  const onActionBtnClick = (e, btnType) => {
    e.stopPropagation();

    switch (btnType) {
      case "add":
        triggerCustomEvent(CREATE_NODE_EVENT_NAME, {
          parentNodeId: node.id,
        });
        break;

      case "rename":
        triggerCustomEvent(RENAME_NODE_EVENT_NAME, {
          nodeId: node.id,
        });
        break;

      case "delete":
        triggerCustomEvent(DELETE_NODE_EVENT_NAME, {
          nodeId: node.id,
        });
        break;

      default:
        break;
    }
  };
  const handleChildrenShow = () => setIsChildrenShown((prev) => !prev);

  return (
    <>
      <div
        className={cx("node", isChildrenShown && "expanded")}
        onClick={handleChildrenShow}
      >
        {hasChildren && <ChevronRightIcon className={s.chevron} />}
        <span className={s.name}>{isRootNode ? "Root" : node.name}</span>
        <div className={cx("actionBtns")}>
          <Button onClick={(e) => onActionBtnClick(e, "add")}>
            <AddCircleIcon />
          </Button>
          {!isRootNode && (
            <>
              <Button onClick={(e) => onActionBtnClick(e, "rename")}>
                <EditIcon />
              </Button>
              <Button onClick={(e) => onActionBtnClick(e, "delete")}>
                <DeleteIcon />
              </Button>
            </>
          )}
        </div>
      </div>

      {hasChildren && isChildrenShown && (
        <div className={s.children}>{childrenNodes}</div>
      )}
    </>
  );
};

export default Node;
