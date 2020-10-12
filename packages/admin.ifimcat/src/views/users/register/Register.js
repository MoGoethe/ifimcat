import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInvalidFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useMutation } from '@apollo/react-hooks';
import { M_REGISTER } from '../../../queries';
import { isEmail } from '../../../utils/validate'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [usernameValidate, setUsernameValidate] = useState({});
  const [emailValidate, setEmailValidate] = useState({});
  const [passwordValidate, setPasswordValidate] = useState({});
  const [rePasswordValidate, setRePasswordValidate] = useState({});
  const [modal, setModal] = useState({show: false, title: '', info: '', color: ''});
  const [register, {loading}] = useMutation(M_REGISTER, {
    variables: {
      email,
      username,
      password,
    },
    onCompleted: ({ register }) => {
      if (register) {
        setModal({
          show: true,
          title: '注册成功',
          info: `欢迎你${register.username}，我们已经向你${register.email}发送了确认邮件，快去确认使用吧！`,
          color: 'success'
        });
      }
    },
    onError: ({graphQLErrors}) => {
      const { message } = graphQLErrors[0].extensions.exception.response;
      setModal({show: true, title: '错误', info: message[0], color: 'danger'});
    }
  });

  const toggle = () => {
    setModal({show: !modal.show});
  }

  const submit = () => {
    if (username.length < 4) {
      setUsernameValidate({invalid: true, message: "昵称长度不能低于4"});
      return;
    }
    setUsernameValidate({valid: true})
    if (!isEmail(email)) {
      setEmailValidate({invalid: true, message: "邮箱格式错误"});
      return;
    }
    setEmailValidate({valid: true})
    if (password.length < 4) {
      setPasswordValidate({invalid: true, message: "密码长度不能低于6"});
      return;
    }
    setPasswordValidate({valid: true})
    if (rePassword !== password) {
      setRePasswordValidate({invalid: true, message: "两次密码输入不一致"});
      return;
    }
    setRePasswordValidate({valid: true});
    register();
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center user-bg--full">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="user-form">
                  <h1>注册</h1>
                  <p className="text-muted">创建你的管理端账户</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="用户名"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      autoComplete="username"
                      {...usernameValidate}
                    />
                    <CInvalidFeedback>{usernameValidate.message}</CInvalidFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="邮箱"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      {...emailValidate}
                    />
                    <CInvalidFeedback>{emailValidate.message}</CInvalidFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="密码"
                      autoComplete="new-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      {...passwordValidate}
                    />
                    <CInvalidFeedback>{passwordValidate.message}</CInvalidFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="再次输入密码"
                      autoComplete="new-password"
                      value={rePassword}
                      onChange={e => setRePassword(e.target.value)}
                      {...rePasswordValidate}
                    />
                    <CInvalidFeedback>{rePasswordValidate.message}</CInvalidFeedback>
                  </CInputGroup>
                  <CButton color="success" disabled={loading} onClick={() => submit()} block>创建账户</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <p>已有账户，<Link to="/login">立即登录</Link></p>
                </CRow>
              </CCardFooter>
            </CCard>
            <CModal
              show={modal.show}
              onClose={toggle}
              color={modal.color}
            >
              <CModalHeader closeButton>{modal.title}</CModalHeader>
              <CModalBody>{modal.info}</CModalBody>
              <CModalFooter>
                <CButton onClick={toggle} color={modal.color || 'info'}>我知道了</CButton>
              </CModalFooter>
            </CModal>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
