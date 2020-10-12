import React from 'react';
import {
  CCol,
  CRow,
} from '@coreui/react';
import ListTable from "../../components/listTable";
import { LoadingBar } from "../../components/Loading";
import {
  useQuery,
} from '@apollo/react-hooks';
import {
  Q_GETCATEGORIES,
  M_UPDATECATEGORY,
  M_DELETECATEGORY,
  M_CREATECATEGORY
} from '../../queries';

const Category = () => {
  const { data, loading } = useQuery(Q_GETCATEGORIES);
  return (
    <>
      {loading && <LoadingBar />}
      <CRow>
        <CCol xs="12">
          <ListTable
            data={data?.getCategories}
            loading={loading}
            createMutation={M_CREATECATEGORY}
            refetchQueryCreate={Q_GETCATEGORIES}
            updateMutation={M_UPDATECATEGORY}
            deleteMutation={M_DELETECATEGORY}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Category
