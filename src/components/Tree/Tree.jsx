import Node from "../Node/Node";

const Tree = ({ tree }) => {
  const rootNode = tree.id;

  const renderTree = (node) => {
    const hasChildren = node.children.length;
    const children = hasChildren ? node.children.map(renderTree) : null;

    return (
      <Node
        key={node.id}
        node={node}
        childrenNodes={children}
        isRootNode={node.id === rootNode}
      />
    );
  };

  return renderTree(tree);
};

export default Tree;
