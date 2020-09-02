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
  Q_GETTOPICS,
  M_UPDATETOPIC,
  M_DELETETOPIC,
  M_CREATETOPIC
} from '../../queries';
import notificaty from "../../components/Notificaty";
import { dateTimeFormate } from '../../utils/tools';

const fields = [{
    key: 'name',
    label: "专题名称",
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

const Topic = () => {
  const [editTopic, setEditTopic] = useState({});
  const [deleteTopicId, setDeleteTopicId] = useState(-1);
  const { data, loading } = useQuery(Q_GETTOPICS);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [createModalName, setCreateModalName] = useState('');
  const [saveEditTopic] = useMutation(M_UPDATETOPIC, {
    variables: {
      id: editTopic.id,
      name: editTopic.name
    },
    onCompleted() {
      notificaty.destoryAll();
      notificaty.success("修改完成");
      setEditTopic({});
    },
    onError() {
      notificaty.error("服务器异常，请稍后再试");
    }
  });
  const [deleteTopic] = useMutation(M_DELETETOPIC, {
    variables: {
      id: deleteTopicId
    },
    onCompleted(result) {
      notificaty.destoryAll();
      const _topic = result.deleteTopic;
      notificaty.success(`专题 ${_topic.name} 已删除`);
      setDeleteTopicId(-1);
      toggleDeleteModal();
    },
    refetchQueries: [{ query: Q_GETTOPICS }],
    awaitRefetchQueries: true,
    onError() {
      notificaty.error("服务器异常，请稍后再试");
      setDeleteTopicId(-1);
    }
  });
  const [createTopic] = useMutation(M_CREATETOPIC, {
    variables: {
      data: {name: createModalName}
    },
    onCompleted(result) {
      notificaty.destoryAll();
      const _topic = result.createTopic;
      notificaty.success(`已创建新专题 ${_topic.name}`);
      setCreateModalName('');
      toggleCreateModal();
    },
    refetchQueries: [{ query: Q_GETTOPICS }],
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
    const origin = data.getTopics.find(item => item.id === editTopic.id);
    if (origin.name === editTopic.name) {
      notificaty.warning("没有修改任何内容");
      return;
    }
    notificaty.loading("保存中，请等待...", 0);
    saveEditTopic();
  };

  const remove = () => {
    notificaty.loading("删除中，请等待...", 0);
    deleteTopic();
  };

  const create = () => {
    notificaty.loading("创建中，请等待...", 0);
    createTopic()
  }

  const validateRemove = (id, blogs) => {
    if (blogs.length > 0) {
      notificaty.error("当前专题已经被博客引用，不允许删除！");
      return
    }
    setDeleteTopicId(id);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  };

  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  };

  slots.name = topic => {
    if (topic.id === editTopic.id) {
      return (<td>
        <CInput
          value={editTopic.name}
          onChange={e => setEditTopic({ ...editTopic, name: e.target.value })}  
        /></td>)
    }
    return (<td>{topic.name}</td>)
  };
  slots.author = ({ author }) => (<td>{author.username}</td>);
  slots.blogs = ({blogs}) => (<td>{blogs.length}</td>);
  slots.createAt = ({ createAt }) => {
    return (<td>{dateTimeFormate(createAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.updateAt = ({ updateAt }) => {
    return (<td>{dateTimeFormate(updateAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.action = topic => {
    if (topic.id === editTopic.id) {
      return (<td>
        <span className="link" onClick={save}>保存</span>
        <span className="link" onClick={() => { setEditTopic({}) }}>取消</span>
      </td>)
    }
    return (<td>
      <span className="link" onClick={() => { setEditTopic(topic) }}>编辑</span>
      <span className="link" onClick={() => validateRemove(topic.id, topic.blogs)}>删除</span>
    </td>)
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>专题管理</CCardHeader>
            <CCardBody>
              <CButton color="primary" className="mb-20" onClick={toggleCreateModal}>创建新专题</CButton>
              <CDataTable
                items={data ? data.getTopics : []}
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
        <CModalHeader closeButton>你确定要删除此专题吗？</CModalHeader>
        <CModalBody>你确定要删除此专题吗？删除后将从列表中移除且无法恢复。</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={remove}>确定删除</CButton>
          <CButton color="secondary" onClick={toggleDeleteModal} >取消</CButton>
        </CModalFooter>
      </CModal>
      <CModal show={createModal} onClose={toggleCreateModal}>
        <CModalHeader closeButton>创建新专题</CModalHeader>
        <CModalBody>
          <CInput placeholder="请输入专题名称" value={createModalName} onChange={e => setCreateModalName(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={create}>确定</CButton>
          <CButton color="secondary" onClick={toggleCreateModal} >取消</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Topic
