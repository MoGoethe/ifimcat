import React from 'react';
import {
  CCol,
  CRow,
} from '@coreui/react';
import {
  useQuery,
} from '@apollo/react-hooks';
import {
  Q_GETTAGS,
  M_UPDATETAG,
  M_DELETETAG,
  M_CREATETAG
} from '../../queries';
import ListTable from "../../components/listTable";
import { LoadingBar } from "../../components/Loading";

const Tag = () => {
  const { data, loading } = useQuery(Q_GETTAGS);
  
  return (
    <>
      {loading && <LoadingBar />}
      <CRow>
        <CCol xs="12">
          <ListTable
            data={data?.getTags}
            loading={loading}
            createMutation={M_CREATETAG}
            refetchQueryCreate={Q_GETTAGS}
            updateMutation={M_UPDATETAG}
            deleteMutation={M_DELETETAG}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Tag
