// src/components/connect-wallet/primereact/NodeService.js
export const NodeService = {
  getTreeNodes() {
    // API chaqiruv yoki ma'lumot olish kodini yozing
    return fetch('/api/tree-nodes')
      .then((response) => response.json())
      .then((data) => data);
  },
};
