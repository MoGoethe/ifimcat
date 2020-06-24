import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useMutation } from '@apollo/react-hooks';
import { SET_CURRENT_USER } from '../../../actions';
import { M_LOGIN } from '../../../queries';
import { isEmail } from '../../../utils/validate';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [login, { loading }] = useMutation(M_LOGIN, {
    variables: {
      email,
      password,
    },
    onCompleted(data) {
      localStorage.setItem('has_been_login', data.login.email);
      dispatch({type: SET_CURRENT_USER, currentUser: data.login});
      props.history.push("/dashboard");
    },
    onError(err) {
      // 错误信息处理
      console.log(err);
    }
  });

  const emailValidate = {};
  if (isEmail(email) && email.length > 0) {
    emailValidate.valid = true;
  } else if (email.length > 0) {
    emailValidate.invalid = true;
    emailValidate.message = '邮箱格式错误';
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center user-bg--full">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>登录</h1>
                    <p className="text-muted">使用你的邮箱密码登录</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="邮箱"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        valid={emailValidate.valid}
                        invalid={emailValidate.invalid}
                      />
                      <CInvalidFeedback>{emailValidate.message}</CInvalidFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="密码"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        valid={password.length >= 6}
                        invalid={password.length < 6 && password.length !== 0}
                      />
                      <CInvalidFeedback>密码长度不能小于6</CInvalidFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" disabled={loading} onClick={() => login()}>登录</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0" to="/forgot-password">忘记密码?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody>
                  <div>
                    <h2 className="text-center">注册账户</h2>
                    <p>如果我是喵，ifimcat.com是歌德巴赫的个人博客，这里是它的管理后台，如果你也想加入一起写作，
                    发布你的博客的话，立即注册吧！</p>
                    <p className="text-center">
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>立即注册!</CButton>
                      </Link>
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
