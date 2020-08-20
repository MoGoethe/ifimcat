import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CBadge,
  CSwitch,
} from '@coreui/react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Q_GETADMINBLOGS,
  M_UPDATEBLOG,
} from '../../queries';
import { dateTimeFormate } from '../../utils/tools';
import notificaty from '../../components/Notificaty';

const fields = [
  {key: 'title', label: "标题"},
  {key: 'description', label: "描述"},
  {key: 'is_show', label: "是否展示"},
  {key: 'author', label: "作者"},
  {key: 'createAt', label: "创建时间"},
  {key: 'updateAt', label: "最近更新时间"},
  {key: 'action', label: "操作", _style:{width: "98px"}},
]
// 列渲染插槽
const slots = {};

const Blog = () => {
  const defaultBlog = {
    category: {},
    topic: {},
    tags: [],
  }
  const [editBlog, setEditBlog] = useState(defaultBlog);
  const { data, loading } = useQuery(Q_GETADMINBLOGS);

  const getVariableValues = () => {
    const variables = {};
    variables.id = editBlog.id;
    variables.title = editBlog.title;
    variables.description = editBlog.description;
    variables.body = editBlog.body;
    variables.category = Number(editBlog.category.id) || -1;
    variables.topic = Number(editBlog.topic.id) || -1;
    variables.tags = editBlog.tags.map(item => Number(item.id));
    variables.glance = editBlog.glance;
    variables.awesome = editBlog.awesome;
    variables.is_show = editBlog.is_show;
    return variables;
  };

  const [saveEditBlog] = useMutation(M_UPDATEBLOG, {
    variables: { data: getVariableValues()},
    onCompleted() {
      setEditBlog(defaultBlog);
      notificaty.destoryAll();
      notificaty.success('已保存成功！');
    },
    refetchQueries: [{query: Q_GETADMINBLOGS}],
    onError(err) {
      notificaty.destoryAll();
      if (err[0] && err[0].message) {
        notificaty.error(err[0].message);
        return
      }
      notificaty.error('出错啦，服务器异常，请稍后再试！');
    }
  });
  const save = () => {
    notificaty.loading("保存中，请稍后...");
    saveEditBlog();
  }

  slots.is_show = (blog) => {
    if (blog.key === editBlog.key) {
      return (<td><CSwitch
        className="mx-1"
        color={'primary'}
        checked={editBlog.is_show}
        onChange={e => setEditBlog({...editBlog, is_show: e.target.checked})}
      /></td>)
    }
    return (<td><CSwitch className="mx-1" color="primary" checked={blog.is_show} disabled /></td>)
  };
  slots.author = ({author}) => (<td><CBadge>{author.username}</CBadge></td>);
  slots.action = (blog) => {
    if (blog.key === editBlog.key) {
      return (<td>
        <span className="link" onClick={save}>保存</span>
        <span className="link" onClick={() => { setEditBlog(defaultBlog) }}>取消</span>
      </td>)
    }
    return (<td>
      <span className="link" onClick={() => { setEditBlog(blog) }}>设置</span>
      <Link className="link" to={`/editor?blogKey=${blog.key}`}>编辑</Link>
    </td>)
  };
  slots.updateAt = ({ updateAt }) => (<td>{dateTimeFormate(updateAt, 'yyyy-MM-dd hh:mm:ss')}</td>);
  slots.createAt = ({ createAt }) => (<td>{dateTimeFormate(createAt, 'yyyy-MM-dd hh:mm:ss')}</td>)

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

/*
# The Go Programming Language

Go is an open source programming language that makes it easy to build simple,
reliable, and efficient software.

![Gopher image](https://github.com/golang/go/raw/master/doc/gopher/fiveyears.jpg)
*Gopher image by [Renee French][rf], licensed under [Creative Commons 3.0 Attributions license][cc3-by].*

Our canonical Git repository is located at https://go.googlesource.com/go.
There is a mirror of the repository at https://github.com/golang/go.

Unless otherwise noted, the Go source files are distributed under the
BSD-style license found in the LICENSE file.

### Download and Install

#### Binary Distributions

Official binary distributions are available at https://golang.org/dl/.

After downloading a binary release, visit https://golang.org/doc/install
or load [doc/install.html](./doc/install.html) in your web browser for installation
instructions.

#### Install From Source

If a binary distribution is not available for your combination of
operating system and architecture, visit
https://golang.org/doc/install/source or load [doc/install-source.html](./doc/install-source.html)
in your web browser for source installation instructions.

### Contributing

Go is the work of thousands of contributors. We appreciate your help!

To contribute, please read the contribution guidelines:
	https://golang.org/doc/contribute.html

Note that the Go project uses the issue tracker for bug reports and
proposals only. See https://golang.org/wiki/Questions for a list of
places to ask questions about the Go language.

[rf]: https://reneefrench.blogspot.com/
[cc3-by]: https://creativecommons.org/licenses/by/3.0/

*/