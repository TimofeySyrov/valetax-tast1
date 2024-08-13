export const postTree = async () => {
  const DOMAIN_URL = import.meta.env.VITE_TREE_DOMAIN_URL;

  try {
    const response = await fetch(
      `${DOMAIN_URL}/api.user.tree.get?` +
        new URLSearchParams({ treeName: import.meta.env.VITE_TREE_GUID })
    );

    if (!response.ok) {
      const errorMsg = response.body?.data?.message;
      throw new Error(errorMsg ?? "Failed to POST new/existing tree");
    }

    const treeData = await response.json();

    return treeData;
  } catch (error) {
    console.error(error);
  }
};
