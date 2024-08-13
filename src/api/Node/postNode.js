export const postNode = async (parentNodeId, nodeName) => {
  const DOMAIN_URL = import.meta.env.VITE_TREE_DOMAIN_URL;

  try {
    const response = await fetch(
      `${DOMAIN_URL}/api.user.tree.node.create?` +
        new URLSearchParams({
          treeName: import.meta.env.VITE_TREE_GUID,
          parentNodeId,
          nodeName,
        })
    );

    if (!response.ok) {
      const errorMsg = response.body?.data?.message;
      throw new Error(errorMsg ?? `Failed to POST new "${nodeName}" node`);
    }
  } catch (error) {
    console.error(error);
  }
};
