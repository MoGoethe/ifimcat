import React, { useContext, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import { AuthContext } from '../../conext/Auth.context'

const Edit = (props) => {
  const blogKey = props.location.search.split('?blogKey=')[1]
  const ctx = useContext(AuthContext);
  console.log(ctx, blogKey)
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Categories</CCardHeader>
          <CCardBody>
            content
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Edit
