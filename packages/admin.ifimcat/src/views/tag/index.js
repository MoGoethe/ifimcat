import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CInput,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import {
  useQuery,
  useMutation
} from '@apollo/react-hooks';
import {
  Q_GETTAGS,
  M_UPDATETAG,
  M_DELETETAG,
  M_CREATETAG
} from '../../queries';
import notificaty from "../../components/Notificaty";
import { dateTimeFormate } from '../../utils/tools';

const fields = [{
    key: 'name',
    label: "标签名称",
    _style: {
      width: "300px",
    }
  }, {
    key: 'author',
    label: "创建人"
  }, {
    key: 'blogs',
    label: "博客引用次数"
  }, {
    key: 'createAt',
    label: "创建时间",
    _style: {
      width: "178px",
    }
  }, {
    key: 'updateAt',
    label: "最近更新时间",
    _style: {
      width: "178px"
    }
  },
  {
    key: 'action',
    label: "操作",
    _style: {
      width: "98px"
    }
  },
]
const slots = {};

const Tag = () => {
  const [editTag, setEditTag] = useState({});
  const [deleteTagId, setDeleteTagId] = useState(-1);
  const { data, loading } = useQuery(Q_GETTAGS);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [createModalName, setCreateModalName] = useState('');
  const [saveEditTag] = useMutation(M_UPDATETAG, {
    variables: {
      id: editTag.id,
      name: editTag.name
    },
    onCompleted() {
      notificaty.destoryAll();
      notificaty.success("修改完成");
      setEditTag({});
    },
    onError() {
      notificaty.error("服务器异常，请稍后再试");
    }
  });
  const [deleteTag] = useMutation(M_DELETETAG, {
    variables: {
      id: deleteTagId
    },
    onCompleted(result) {
      notificaty.destoryAll();
      const _tag = result.deleteTag;
      notificaty.success(`标签 ${_tag.name} 已删除`);
      setDeleteTagId(-1);
      toggleDeleteModal();
    },
    refetchQueries: [{ query: Q_GETTAGS }],
    awaitRefetchQueries: true,
    onError() {
      notificaty.error("服务器异常，请稍后再试");
      setDeleteTagId(-1);
    }
  });
  const [createTag] = useMutation(M_CREATETAG, {
    variables: {
      data: {name: createModalName}
    },
    onCompleted(result) {
      notificaty.destoryAll();
      const _tag = result.createTag;
      notificaty.success(`已创建新标签 ${_tag.name}`);
      setCreateModalName('');
      toggleCreateModal();
    },
    refetchQueries: [{ query: Q_GETTAGS }],
    awaitRefetchQueries: true,
    onError({graphQLErrors}) {
      notificaty.destoryAll();
      if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].extensions) { 
        const message = graphQLErrors[0].extensions.exception.response.message[0];
        notificaty.error(message);
        return;
      }
      notificaty.error("服务器异常，请稍后再试");
    }
  });

  const save = () => {
    const origin = data.getTags.find(item => item.id === editTag.id);
    if (origin.name === editTag.name) {
      notificaty.warning("没有修改任何内容");
      return;
    }
    notificaty.loading("保存中，请等待...", 0);
    saveEditTag();
  };

  const remove = () => {
    notificaty.loading("删除中，请等待...", 0);
    deleteTag();
  };

  const create = () => {
    notificaty.loading("创建中，请等待...", 0);
    createTag()
  }

  const validateRemove = (id, blogs) => {
    if (blogs.length > 0) {
      notificaty.error("当前标签已经被博客引用，不允许删除！");
      return
    }
    setDeleteTagId(id);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  };

  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  };

  slots.name = tag => {
    if (tag.id === editTag.id) {
      return (<td>
        <CInput
          value={editTag.name}
          onChange={e => setEditTag({ ...editTag, name: e.target.value })}  
        /></td>)
    }
    return (<td>{tag.name}</td>)
  };
  slots.author = ({ author }) => (<td>{author.username}</td>);
  slots.blogs = ({blogs}) => (<td>{blogs.length}</td>);
  slots.createAt = ({ createAt }) => {
    return (<td>{dateTimeFormate(createAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.updateAt = ({ updateAt }) => {
    return (<td>{dateTimeFormate(updateAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.action = tag => {
    if (tag.id === editTag.id) {
      return (<td>
        <span className="link" onClick={save}>保存</span>
        <span className="link" onClick={() => { setEditTag({}) }}>取消</span>
      </td>)
    }
    return (<td>
      <span className="link" onClick={() => { setEditTag(tag) }}>编辑</span>
      <span className="link" onClick={() => validateRemove(tag.id, tag.blogs)}>删除</span>
    </td>)
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>标签管理</CCardHeader>
            <CCardBody>
              <CButton color="primary" className="mb-20" onClick={toggleCreateModal}>创建新标签</CButton>
              <CDataTable
                items={data ? data.getTags : []}
                fields={fields}
                itemsPerPage={10}
                border
                pagination
                loading={loading}
                scopedSlots={slots}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={deleteModal} onClose={toggleDeleteModal}>
        <CModalHeader closeButton>你确定要删除此标签吗？</CModalHeader>
        <CModalBody>你确定要删除此标签吗？删除后将从列表中移除且无法恢复。</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={remove}>确定删除</CButton>
          <CButton color="secondary" onClick={toggleDeleteModal} >取消</CButton>
        </CModalFooter>
      </CModal>
      <CModal show={createModal} onClose={toggleCreateModal}>
        <CModalHeader closeButton>创建新标签</CModalHeader>
        <CModalBody>
          <CInput placeholder="请输入标签名称" value={createModalName} onChange={e => setCreateModalName(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={create}>确定</CButton>
          <CButton color="secondary" onClick={toggleCreateModal} >取消</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Tag
