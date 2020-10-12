import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CSubheader,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { TOGGLE_SLIDEBAR } from '../actions';

// routes config
// import routes from '../routes';

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector(state => state.sildeBar);
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch({type: TOGGLE_SLIDEBAR, sidebarShow: val});
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch({type: TOGGLE_SLIDEBAR, sidebarShow: val});
  };

  return (
    <CHeader withSubheader>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>
      <CSubheader className="px-3 justify-content-between">
        <CToggler
          inHeader
          className="d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="d-md-down-none"
          onClick={toggleSidebar}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CButton color="primary" size="sm" onClick={() => props.history.push('/editor')}>
            <CIcon name="cil-pencil" />&nbsp;&nbsp;写博客
          </CButton>
        </div>
      </CSubheader>
    </CHeader>
  )
};

export default TheHeader;
