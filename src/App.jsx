import { useEffect, useState } from "react";
import { postTree } from "./api/Tree/postTree";
import "./App.css";
import CreateNode from "./components/Modals/CreateNode/CreateNode";
import DeleteNode from "./components/Modals/DeleteNode/DeleteNode";
import RenameNode from "./components/Modals/RenameNode/RenameNode";
import Tree from "./components/Tree/Tree";

function App() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    postTree().then(setTreeData);
  }, []);

  return (
    treeData && (
      <>
        <Tree tree={treeData} />

        <CreateNode />
        <RenameNode />
        <DeleteNode />
      </>
    )
  );
}

export default App;
