import gql from 'graphql-tag';

// test
export const TEST_SERVER = gql`
  query {
    hello
  }
`;

// user ---------------------------------------------------------------------------
// 登录
export const M_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(data: {
      email: $email,
      password: $password,
    }) {
      id
      username
      email
      roles
    }
  }
`;
// 获取当前登陆用户信息
export const Q_CURRENT_USER = gql`
  query {
    currentUser{
      id
      username
      email
      roles
    }
  }
`;
// 注册
export const M_REGISTER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(data: {
      email: $email,
      username: $username,
      password: $password,
    }) {
      id
      username
      email
    }
  }
`;

// blogs ---------------------------------------------------------------------------
// 获取能管理的博客列表
export const Q_GETADMINBLOGS = gql`
  query {
    getAdminBlogs {
      id
      key
      title
      description
      body
      is_show
      author {
        username
      }
      updateAt
    }
  }
`;
// 保存更改
export const M_UPDATEBLOG = gql`
  mutation($blog: UpdateBlogInput!) {
    updateBlog(data: $blog) {
      title
    }
  }
`;
