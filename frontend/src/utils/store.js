export default {
  getSidebarState: () => JSON.parse(localStorage.getItem("sidebar")),
  setSidebarState: (s) => localStorage.setItem("sidebar", s),
};

