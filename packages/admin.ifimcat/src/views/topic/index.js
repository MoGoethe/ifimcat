import React from 'react';
import {
  CCol,
  CRow,
} from '@coreui/react';
import {
  useQuery,
} from '@apollo/react-hooks';
import {
  Q_GETTOPICS,
  M_UPDATETOPIC,
  M_DELETETOPIC,
  M_CREATETOPIC
} from '../../queries';
import ListTable from "../../components/listTable";
import { LoadingBar } from "../../components/Loading";

const Topic = () => {
  const { data, loading } = useQuery(Q_GETTOPICS);
  return (
    <>
      {loading && <LoadingBar />}
      <CRow>
        <CCol xs="12">
          <ListTable
            data={data?.getTopics}
            loading={loading}
            createMutation={M_CREATETOPIC}
            refetchQueryCreate={Q_GETTOPICS}
            updateMutation={M_UPDATETOPIC}
            deleteMutation={M_DELETETOPIC}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Topic
