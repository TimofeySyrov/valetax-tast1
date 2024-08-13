export const renameNode = async (nodeId, newNodeName) => {
  const DOMAIN_URL = import.meta.env.VITE_TREE_DOMAIN_URL;

  try {
    const response = await fetch(
      `${DOMAIN_URL}/api.user.tree.node.rename?` +
        new URLSearchParams({
          treeName: import.meta.env.VITE_TREE_GUID,
          nodeId,
          newNodeName,
        })
    );

    if (!response.ok) {
      const errorMsg = response.body?.data?.message;
      throw new Error(
        errorMsg ??
          `Failed to RENAME "${nodeId}" node to new "${newNodeName}" name`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
