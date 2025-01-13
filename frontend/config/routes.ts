export const ROUTES = {
  //======================
  // AUTH
  //======================
  LOGIN: "/login",
  REGISTER: "/register",

  //======================
  // DASHBOARD
  //======================
  DASHBOARD: "/dashboard",
  CREATE: "/dashboard/create",
  EDIT$: function (id: string | number) {
    return `${this.DASHBOARD}/edit/${id}`;
  },
};
