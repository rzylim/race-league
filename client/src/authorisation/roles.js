const roles = {
  visitor: {
    static: ["series:view", "championships:view", "users:view"],
  },
  member: {
    static: [
      "series:view",
      "championships:view",
      "users:list",
      "users:viewSelf",
      "users:editSelf",
      "home-page:visit",
      "dashboard-page:visit",
    ],
    dynamic: {
      "posts:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  moderator: {
    static: [
      "series:view",
      "championships:view",
      "users:list",
      "users:viewSelf",
      "users:editSelf",
      "home-page:visit",
      "dashboard-page:visit",
    ],
    dynamic: {
      "posts:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  administrator: {
    static: [
      "series:view",
      "series:edit",
      "championships:view",
      "championships:edit",
      "users:list",
      "dashboard-page:visit",
    ],
  },
};

export default rules;
