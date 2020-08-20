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
  Q_GETCATEGORIES,
  M_UPDATECATEGORY,
  M_DELETECATEGORY,
  M_CREATECATEGORY
} from '../../queries';
import notificaty from "../../components/Notificaty";
import { dateTimeFormate } from '../../utils/tools';

const fields = [{
    key: 'name',
    label: "分类名称",
    _style: {
      width: "300px",
    }
  }, {
    key: 'author',
    label: "创建人"
  }, {
    key: 'blogs',
    label: "博客数量"
  }, {
    key: 'createAt',
    label: "创建时间",
    _style: {
      width: "168px",
    }
  }, {
    key: 'updateAt',
    label: "最近更新时间",
    _style: {
      width: "168px"
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

const Category = () => {
  const [editCategory, setEditCategory] = useState({});
  const [deleteCategoryId, setDeleteCategoryId] = useState(-1);
  const { data, loading } = useQuery(Q_GETCATEGORIES);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [createModalName, setCreateModalName] = useState('');
  const [saveEditCategory] = useMutation(M_UPDATECATEGORY, {
    variables: {
      id: editCategory.id,
      name: editCategory.name
    },
    onCompleted() {
      notificaty.destoryAll();
      notificaty.success("修改完成");
      setEditCategory({});
    },
    onError() {
      notificaty.error("服务器异常，请稍后再试");
    }
  });
  const [deleteCategory] = useMutation(M_DELETECATEGORY, {
    variables: {
      id: deleteCategoryId
    },
    onCompleted(result) {
      notificaty.destoryAll();
      const _category = result.deleteCategory;
      notificaty.success(`类别 ${_category.name} 已删除`);
      setDeleteCategoryId(-1);
      toggleDeleteModal();
    },
    refetchQueries: [{ query: Q_GETCATEGORIES }],
    awaitRefetchQueries: true,
    onError() {
      notificaty.error("服务器异常，请稍后再试");
      setDeleteCategoryId(-1);
    }
  });
  const [createCategory] = useMutation(M_CREATECATEGORY, {
    variables: {
      data: {name: createModalName}
    },
    onCompleted(result) {
      notificaty.destoryAll();
      const _category = result.createCategory;
      notificaty.success(`以创建新类别 ${_category.name}`);
      toggleCreateModal();
    },
    refetchQueries: [{
      query: Q_GETCATEGORIES
    }],
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
    const origin = data.getCategories.find(item => item.id === editCategory.id);
    if (origin.name === editCategory.name) {
      notificaty.warning("没有修改任何内容");
      return;
    }
    notificaty.loading("保存中，请等待...", 0);
    saveEditCategory();
  };

  const remove = () => {
    notificaty.loading("删除中，请等待...", 0);
    deleteCategory();
  };

  const create = () => {
    notificaty.loading("创建中，请等待...", 0);
    createCategory()
  }

  const validateRemove = (id, blogs) => {
    if (blogs.length > 0) {
      notificaty.error("当前类别下有博客，不允许删除！");
      return
    }
    setDeleteCategoryId(id);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  };

  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  };

  slots.name = category => {
    if (category.id === editCategory.id) {
      return (<td>
        <CInput
          value={editCategory.name}
          onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}  
        /></td>)
    }
    return (<td>{category.name}</td>)
  };
  slots.author = ({ author }) => (<td>{author.username}</td>);
  slots.blogs = ({blogs}) => (<td>{blogs.length}</td>);
  slots.createAt = ({ createAt }) => {
    return (<td>{dateTimeFormate(createAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.updateAt = ({ updateAt }) => {
    return (<td>{dateTimeFormate(updateAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.action = category => {
    if (category.id === editCategory.id) {
      return (<td>
        <span className="link" onClick={save}>保存</span>
        <span className="link" onClick={() => { setEditCategory({}) }}>取消</span>
      </td>)
    }
    return (<td>
      <span className="link" onClick={() => { setEditCategory(category) }}>编辑</span>
      <span className="link" onClick={() => validateRemove(category.id, category.blogs)}>删除</span>
    </td>)
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>分类管理</CCardHeader>
            <CCardBody>
              <CButton color="primary" className="mb-20" onClick={toggleCreateModal}>创建新类别</CButton>
              <CDataTable
                items={data ? data.getCategories : []}
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
        <CModalHeader closeButton>你确定要删除此类别吗？</CModalHeader>
        <CModalBody>你确定要删除此类别吗？删除后将从列表中移除且无法恢复。</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={remove}>确定删除</CButton>
          <CButton color="secondary" onClick={toggleDeleteModal} >取消</CButton>
        </CModalFooter>
      </CModal>
      <CModal show={createModal} onClose={toggleCreateModal}>
        <CModalHeader closeButton>创建新类别</CModalHeader>
        <CModalBody>
          <CInput placeholder="请输入类别名称" value={createModalName} onChange={e => setCreateModalName(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={create}>确定</CButton>
          <CButton color="secondary" onClick={toggleCreateModal} >取消</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Category
