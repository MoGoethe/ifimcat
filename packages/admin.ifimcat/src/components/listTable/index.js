import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CInput,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CLabel,
  CTextarea
} from '@coreui/react';
import {
  useMutation
} from '@apollo/react-hooks';

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
];
const slots = {};

const ListTable = props => {

  const {
    data,
    loading,
    createMutation,
    refetchQueryCreate,
    updateMutation,
    deleteMutation,
  } = props;

  const [createModal, setCreateModal] = useState({});
  const [updateModal, setUpdateModal] = useState({});
  const [deleteModal, setDeleteModal] = useState({});

  slots.name = tag => (<td>{tag.name}</td>);
  slots.author = ({ author }) => (<td>{author.username}</td>);
  slots.blogs = ({ blogs }) => (<td>{blogs.length}</td>);
  slots.createAt = ({ createAt }) => (<td>{dateTimeFormate(createAt, 'yyyy-MM-dd hh:mm:ss')}</td>);
  slots.updateAt = ({ updateAt }) => (<td>{dateTimeFormate(updateAt, 'yyyy-MM-dd hh:mm:ss')}</td>);
  slots.action = tag => {
    return (<td>
      <span className="link" onClick={() => setUpdateModal({...tag, open: true})}>编辑</span>
      <span className="link" onClick={() => setDeleteModal({ ...tag, open: true })}>删除</span>
    </td>)
  };

  const toggleCreateModal = () => {
    setCreateModal({ ...createModal, open: !createModal.open });
  };
  const create = () => {
    notificaty.loading("创建中，请稍后...");
    createData();
  };
  const [createData] = useMutation(createMutation, {
    variables: {
      data: { name: createModal.name, slogan: createModal.slogan, description: createModal.description }
    },
    onCompleted() {
      notificaty.destoryAll();
      notificaty.success(`已成功创建数据`);
      setCreateModal({});
    },
    refetchQueries: [{ query: refetchQueryCreate }],
    awaitRefetchQueries: true,
    onError({ graphQLErrors }) {
      notificaty.destoryAll();
      if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].extensions) {
        const message = graphQLErrors[0].extensions.exception.response.message[0];
        notificaty.error(message);
        return;
      }
      notificaty.error("服务器异常，请稍后再试");
    }
  });

  const toggleDeleteModal = () => {
    setDeleteModal({ ...deleteModal, open: !deleteModal.open });
  };
  const remove = () => {
    notificaty.loading("删除中，请稍后...");
    if (deleteModal.blogs?.length > 0) {
      notificaty.warning("当前内容已被其他内容引用，不能删除。");
      return;
    }
    deleteData();
  }
  const [deleteData] = useMutation(deleteMutation, {
    variables: {
      id: deleteModal.id
    },
    onCompleted(result) {
      notificaty.destoryAll();
      notificaty.success(`数据已成功删除！`);
      setDeleteModal({});
    },
    refetchQueries: [{ query: refetchQueryCreate }],
    awaitRefetchQueries: true,
    onError() {
      notificaty.error("服务器异常，请稍后再试");
      setDeleteModal({});
    }
  });

  const toggleUpdateModal = () => {
    console.log(updateModal);
    setUpdateModal({ ...updateModal, open: !updateModal.open });
  };
  const update = () => {
    updateData();
  };
  const [updateData] = useMutation(updateMutation, {
    variables: {
      data: {
        id: updateModal.id,
        name: updateModal.name,
        slogan: updateModal.slogan,
        description: updateModal.description,
      }
    },
    onCompleted() {
      notificaty.destoryAll();
      notificaty.success("修改数据更新成功！");
      setUpdateModal({});
    },
    onError() {
      notificaty.error("服务器异常，请稍后再试");
    }
  });

  return (
    <>
      <CCard>
        <CCardHeader>标签管理</CCardHeader>
        <CCardBody>
          <CButton color="primary" className="mb-20" onClick={toggleCreateModal}>创建新数据</CButton>
          <CDataTable
            items={data || []}
            fields={fields}
            itemsPerPage={10}
            border
            pagination
            loading={loading}
            scopedSlots={slots}
          />
        </CCardBody>
      </CCard>

      <CModal show={deleteModal.open} onClose={toggleDeleteModal}>
        <CModalHeader closeButton>你确定要删除此内容吗？</CModalHeader>
        <CModalBody>你确定要删除此内容吗？删除后将从列表中移除且无法恢复。</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={remove}>确定删除</CButton>
          <CButton color="secondary" onClick={toggleDeleteModal} >取消</CButton>
        </CModalFooter>
      </CModal>

      <CModal show={createModal.open} onClose={toggleCreateModal}>
        <CModalHeader closeButton>创建新标签</CModalHeader>
        <CModalBody>
          <CForm className="form-horizontal">
            <CFormGroup row>
              <CCol xs="2"><CLabel>名称</CLabel></CCol>
              <CCol xs="9">
                <CInput
                  placeholder="请输入名称"
                  value={createModal.name || ""}
                  onChange={e => setCreateModal({ ...createModal, name: e.target.value })}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="2">
                <CLabel>标语</CLabel>
              </CCol>
              <CCol xs="9">
                <CTextarea
                  placeholder="请输入标语"
                  value={createModal.slogan}
                  onChange={e => setCreateModal({ ...createModal, slogan: e.target.value })}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="2">
                <CLabel>描述</CLabel>
              </CCol>
              <CCol xs="9">
                <CTextarea
                  placeholder="请输入描述"
                  value={createModal.description}
                  onChange={e => setCreateModal({ ...createModal, description: e.target.value })}
                />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={create}>确定</CButton>
          <CButton color="secondary" onClick={toggleCreateModal} >取消</CButton>
        </CModalFooter>
      </CModal>

      <CModal show={updateModal.open} onClose={toggleUpdateModal}>
        <CModalHeader closeButton>更新数据</CModalHeader>
        <CModalBody>
          <CForm className="form-horizontal">
            <CFormGroup row>
              <CCol xs="2"><CLabel>名称</CLabel></CCol>
              <CCol xs="9">
                <CInput
                  placeholder="请输入名称"
                  value={updateModal.name || ""}
                  onChange={e => setUpdateModal({ ...updateModal, name: e.target.value })}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="2">
                <CLabel>标语</CLabel>
              </CCol>
              <CCol xs="9">
                <CTextarea
                  placeholder="请输入标语"
                  value={updateModal.slogan}
                  onChange={e => setUpdateModal({ ...updateModal, slogan: e.target.value })}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="2">
                <CLabel>描述</CLabel>
              </CCol>
              <CCol xs="9">
                <CTextarea
                  placeholder="请输入描述"
                  value={updateModal.description}
                  onChange={e => setUpdateModal({ ...updateModal, description: e.target.value })}
                />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={update}>确定</CButton>
          <CButton color="secondary" onClick={toggleUpdateModal} >取消</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ListTable
