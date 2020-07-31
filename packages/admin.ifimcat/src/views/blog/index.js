import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CBadge,
  CButton,
  CSwitch,
  CInput,
} from '@coreui/react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../conext/Auth.context';
import {
  Q_GETADMINBLOGS,
  M_UPDATEBLOG,
} from '../../queries';

const fields = [
  {key: 'title', label: "标题"},
  {key: 'description', label: "描述"},
  {key: 'is_show', label: "是否展示"},
  {key: 'author', label: "作者"},
  {key: 'updateAt', label: "最近更新时间"},
  {key: 'action', label: "操作", _style:{width: "98px"}},
]
// 列渲染插槽
const slots = {};

const Blog = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx)
  const [editBlog, setEditBlog] = useState({});
  const { data, loading } = useQuery(Q_GETADMINBLOGS);
  const [saveEditBlog, res] = useMutation(M_UPDATEBLOG, {
    variables: {},
    onCompleted(data) {
      
    },
    onError({graphQLErrors}) {
      // setModal({show: true, info: graphQLErrors[0].message});
    }
  });

  slots.is_show = (blog) => {
    if (blog.key === editBlog.key) {
      return (<td><CSwitch
        className={'mx-1'}
        shape={'pill'}
        color={'primary'}
        checked={editBlog.is_show}
        onChange={e => setEditBlog({...editBlog, is_show: e.target.checked})}
      /></td>)
    }
    return (<td style={{color: blog.is_show ? "#2eb85c" : "#ebedef"}}>{blog.is_show ? "展示" : "不展示"}</td>)
  };
  slots.author = ({author}) => (<td><CBadge>{author.username}</CBadge></td>);
  slots.action = (blog) => {
    if (blog.key === editBlog.key) {
      return (<td>
        <a href="#" onClick={saveEditBlog}>保存</a>
        <a href="#" onClick={() => {setEditBlog({})}}>取消</a>
      </td>)
    }
    return (<td>
      <a href="#" onClick={() => {setEditBlog(blog)}}>设置</a>
      <Link to={`/editor?blogKey=${blog.key}`}>编辑</Link>
    </td>)
  }

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>博客列表</CCardHeader>
          <CCardBody>
            <CDataTable
              items={data ? data.getAdminBlogs : []}
              fields={fields}
              itemsPerPage={10}
              border
              pagination
              loading={loading}
              scopedSlots = {slots}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Blog
