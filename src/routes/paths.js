export const path = ({ root, sublink }) => {
  return `${root}${sublink}`;
};

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path({ root: ROOTS_AUTH, sublink: "/login" }),
  register: path({ root: ROOTS_AUTH, sublink: "/register" }),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  blog: {
    root: path({ root: ROOTS_DASHBOARD, sublink: "/blog" }),
    posts: path({ root: ROOTS_DASHBOARD, sublink: "/blog/posts" }),
    post: path({ root: ROOTS_DASHBOARD, sublink: "/blog/post/:title" }),
    postById: path({
      root: ROOTS_DASHBOARD,
      sublink: "/blog/post/apply-these-7-secret-techniques-to-improve-event",
    }),
    newPost: path({ root: ROOTS_DASHBOARD, sublink: "/blog/new-post" }),
  },
};
