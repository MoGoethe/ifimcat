import gql from 'graphql-tag';

// test
export const TEST_SERVER = gql `
  query {
    hello
  }
`;

// user ---------------------------------------------------------------------------
// 登录
export const M_LOGIN = gql `
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
export const Q_CURRENT_USER = gql `
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
export const M_REGISTER = gql `
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
export const Q_GETADMINBLOGS = gql `
  query {
    getAdminBlogs {
      id
      key
      title
      description
      body
      tags {
        id
        key
        name
      }
      topic {
        id
        key
        name
      }
      category {
        id
        key
        name
      }
      awesome
      glance
      is_show
      author {
        username
      }
      updateAt
      createAt
    }
  }
`;
// 保存更改
export const M_UPDATEBLOG = gql `
  mutation($data: UpdateBlogInput!) {
    updateBlog(data: $data) {
      id
      key
      title
      description
      body
      draft
      tags {
        id
        key
        name
      }
      topic {
        id
        key
        name
      }
      category {
        id
        key
        name
      }
      awesome
      glance
      is_show
    }
  }
`;
// 通过key获取博客详情
export const Q_GETBLOGBYKEY = gql `
  query($key: String!) {
    getBlogByKey(key: $key){
      id
      key
      title
      description
      body
      draft
      tags {
        id
        key
        name
      }
      topic {
        id
        key
        name
      }
      category {
        id
        key
        name
      }
      awesome
      glance
      is_show
    }
  }
`;
// 创建新博客
export const M_CREATEBLOG = gql`
  mutation($data: CreateBlogInput!) {
    createBlog(data: $data) {
      id
      key
      title
      description
      body
      draft
      tags {
        id
        key
        name
      }
      topic {
        id
        key
        name
      }
      category {
        id
        key
        name
      }
      awesome
      glance
      is_show
    }
  }
`;

// categiries ---------------------------------------------------------------------------
// 获取分类列表
export const Q_GETCATEGORIES = gql`
  query {
    getCategories {
      id
      key
      name
      author {
        username
      }
      blogs {
        key
      }
      createAt
      updateAt
    }
  }
`;
// 更新类别
export const M_UPDATECATEGORY = gql`
  mutation($id: Float!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
      name
    }
  }
`;
// 删除类别
export const M_DELETECATEGORY = gql`
  mutation($id: Float!) {
    deleteCategory(id: $id) {
      name
      key
    }
  }
`;
// 新增类别
export const M_CREATECATEGORY = gql `
  mutation($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      name
    }
  }
`;

// tags ---------------------------------------------------------------------------
// 获取标签列表
export const Q_GETTAGS = gql `
  query {
    getTags {
      id
      key
      name
      author {
        username
      }
      blogs {
        key
      }
      createAt
      updateAt
    }
  }
`;
// 更新标签
export const M_UPDATETAG = gql `
  mutation($id: Float!, $name: String!) {
    updateTag(id: $id, name: $name) {
      id
      name
    }
  }
`;
// 删除标签
export const M_DELETETAG = gql `
  mutation($id: Float!){
    deleteTag(id: $id) {
      name
      key
    }
  }
`;
// 新增标签
export const M_CREATETAG = gql `
  mutation($data: CreateTagInput!) {
    createTag(data: $data) {
      name
    }
  }
`;

// topics ---------------------------------------------------------------------------
// 获取专题列表
export const Q_GETTOPICS = gql `
  query {
    getTopics {
      id
      key
      name
      author {
        username
      }
      blogs {
        key
      }
      createAt
      updateAt
    }
  }
`;
// 更新专题名称
export const M_UPDATETOPIC = gql `
  mutation($id: Float!, $name: String!) {
    updateTopic(id: $id, name: $name) {
      id
      name
    }
  }
`;
// 删除专题
export const M_DELETETOPIC = gql `
  mutation($id: Float!){
    deleteTopic(id: $id) {
      name
      key
    }
  }
`;
// 新增专题
export const M_CREATETOPIC = gql `
  mutation($data: CreateTopicInput!) {
    createTopic(data: $data) {
      name
    }
  }
`;


// topics ---------------------------------------------------------------------------
// 获取用户列表
export const Q_GETUSERS = gql`
  query{
    getUsers{
      id
      key
      email
      username
      forbid
      roles
      blogs {
        id
      }
      createAt
    }
  }
`;
// 更新用户
export const M_UPDATEUSER = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      email
      username
      roles
    }
  }
`;

// 图片上传
export const M_UPLOAD = gql`
  mutation($file: Upload!) {
    fileUpload(file: $file)
  }
`;