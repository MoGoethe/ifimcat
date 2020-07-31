import React, { useContext } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import { AuthContext } from '../../conext/Auth.context'

const Category = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx);
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

export default Category
