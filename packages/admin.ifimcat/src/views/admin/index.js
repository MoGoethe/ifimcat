import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CInput,
  CSwitch,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from '@coreui/react';
import {
  Q_GETUSERS,
  M_UPDATEUSER,
} from '../../queries';
import { dateTimeFormate } from '../../utils/tools';
import notificaty from "../../components/Notificaty";
import { UserRoleTypes } from "../../constans/UserRoleTypes";

const fields = [
  { key: 'username', label: "用户名" , _style: { width: "200px" } },
  { key: 'email', label: "邮箱" },
  { key: 'roles', label: "角色信息", _style: { width: "320px" } },
  { key: 'forbid', label: "禁用状态" },
  { key: 'createAt', label: "注册时间", _style: { width: "168px" } },
  { key: 'action', label: "操作", _style: { width: "98px" } },
];
const slots = {};

const Admin = () => {
  const { data, loading } = useQuery(Q_GETUSERS);
  const [ editUser, setEditUser ] = useState({});

  const getRoleValue = (roles = []) => {
    const rolesValue = []
    roles.forEach(item => {
      const role = UserRoleTypes.find(currentRole => currentRole.name === item);
      if (role) {
        rolesValue.push(role.value)
      }
    })
    return rolesValue;
  }

  const [updateUser] = useMutation(M_UPDATEUSER, {
    variables: {
      data: {
        userId: editUser.id,
        username: editUser.username,
        roles: getRoleValue(editUser.roles)
      }
    },
    onCompleted() {
      notificaty.destoryAll();
      setEditUser({});
      notificaty.success("已保存成功。")
    },
    refetchQueries: [{ query: Q_GETUSERS }],
    onError(err) {
      notificaty.destoryAll();
      setEditUser({});
      notificaty.error("保存失败，请稍后重试！");
    }
  });

  const save = () => {
    notificaty.loading("保存中，请稍后...", 0);
    updateUser();
  }
  const changeEditUserRoles = e => {
    const newRole = UserRoleTypes.find(item => item.value === e.target.value);
    const roles = editUser.roles;
    const index = roles.findIndex(item => item === newRole.name);
    if (index !== -1) {
      roles.splice(index, 1);
    } else {
      roles.push(newRole.name);
    }
    setEditUser({ ...editUser, roles });
  }
  slots.username = userData => {
    if (userData.id === editUser.id) {
      return (
        <td>
          <CInput
            value={editUser.username}
            onChange={e => setEditUser({ ...editUser, username: e.target.value })}
          />
        </td>
      );
    }
    return (<td>{userData.username}</td>);
  }
  slots.roles = userData => {
    if (userData.id === editUser.id) {
      return ( <td>
        {
          UserRoleTypes.map((item, index) => {
            return (
              <CFormGroup key={`UserRoleTypes-${index}`} variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id={item.name}
                  name={item.name}
                  value={item.value}
                  checked={userData.roles.includes(item.name)}
                  onChange={changeEditUserRoles}
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor={item.name}>{item.name}</CLabel>
              </CFormGroup>
            );
          })
        }
      </td>)
    }
    return (<td>{userData.roles.join("、")}</td>)
  };
  slots.forbid = userData => {
    if (userData.id === editUser.id) {
      return (<td>
        <CSwitch
          color="primary"
          value={editUser.forbid}
          onChange={e => setEditUser({ ...editUser, forbid: e.target.value })}
        />
      </td>)
    }
    return (<td><CSwitch color="primary" value={userData.forbid} disabled /></td>)
  };
  slots.createAt = ({ createAt }) => {
    return (<td>{dateTimeFormate(createAt, 'yyyy-MM-dd hh:mm:ss')}</td>)
  };
  slots.action = (userData) => {
    if (userData.id === editUser.id) {
      return (<td>
        <span className="link" onClick={save}>保存</span>
        <span className="link" onClick={() => setEditUser({})}>取消</span>
      </td>)
    }
    return (<td>
      <span className="link" onClick={() => setEditUser(userData)}>编辑</span>
    </td>)
  };

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>用户管理</CCardHeader>
          <CCardBody>
            <CDataTable
              items={data ? data.getUsers : []}
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

export default Admin
