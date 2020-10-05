import gql from 'graphql-tag';

// test
export const TEST_SERVER = gql `
  query {
    hello
  }
`;

// 首页接口
export const Q_HOME = gql`
  query {
    getBlogs {
      key
      title
      tags{
        name
      }
    }
    getCategories {
      key
      name
      blogs{
        key
        title
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

