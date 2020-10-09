import gql from 'graphql-tag';

// 导航
export const Q_NAVIGATION = gql`
  query {
    getCategories {
      key
      name
      blogs{
        key
        title
      }
    }
  }
`

// 首页接口
export const Q_HOME = gql`
  query {
    getBlogs {
      id
      key
      title
      tags{
        name
      }
    }
    getTags {
      key
      name
    }
    getTopics {
      key
      name
    }
  }
`;

// category page
export const Q_CATEGORY = gql`
  query($key: String!) {
    getCategory(key: $key){
      id
      key
      name
      slogan
      description
      glance
      blogs {
        id
        key
        title
        glance
        awesome
        tags{
          id
          key
          name
        }
      }
      author {
        email
        username
      }
    }
  }
`;

// tag page
export const Q_TAG = gql`
  query($key: String!) {
    getTag(key: $key){
      id
      key
      name
      slogan
      description
      glance
      blogs {
        id
        key
        title
        glance
        awesome
        tags{
          id
          key
          name
        }
      }
      author {
        email
        username
      }
    }
  }
`;

// topic page
export const Q_TOPIC = gql`
  query($key: String!) {
    getTopic(key: $key){
      id
      key
      name
      slogan
      description
      glance
      blogs {
        id
        key
        title
        glance
        awesome
        tags{
          id
          key
          name
        }
      }
      author {
        email
        username
      }
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
      author{
        username
      }
      createAt
      awesome
      glance
      is_show
    }
  }
`;

// 搜索
export const Q_SEARCH = gql`
  query($keywords: String!) {
    getBlogByKeywords(keywords: $keywords){
      id
      key
      title
      tags {
        id
        key
        name
      }
    }
  }
`;