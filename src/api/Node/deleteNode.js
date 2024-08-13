export const deleteNode = async (nodeId) => {
  const DOMAIN_URL = import.meta.env.VITE_TREE_DOMAIN_URL;

  try {
    const response = await fetch(
      `${DOMAIN_URL}/api.user.tree.node.delete?` +
        new URLSearchParams({
          treeName: import.meta.env.VITE_TREE_GUID,
          nodeId,
        })
    );

    if (!response.ok) {
      const errorMsg = response.body?.data?.message;
      throw new Error(errorMsg ?? `Failed to DELETE "${nodeId}" node`);
    }
  } catch (error) {
    console.error(error);
  }
};
