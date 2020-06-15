import React from 'react';
import { useSelector } from 'react-redux';
import GeneralVerticalTable from '../components/common/GeneralVerticalTable';
import GeneralHorizontalTable from '../components/common/GeneralHorizontalTable';
import PaginationContainer from './PaginationContainer';

const ToolBoxContainer = () => {
  const { form, data, status, navSize, viewSize, navViewSize, current, currentPage, loaded } = useSelector(({ tool }) => ({
    form: tool.form,
    data: tool.data,
    status: tool.status,
    navSize: tool.paging.navSize,
    viewSize: tool.paging.viewSize,
    navViewSize: tool.paging.navViewSize,
    current: tool.paging.current,
    currentPage: tool.paging.currentPage,
    loaded: tool.loaded,
  }))

  if (!loaded) {
    return (
      <div className='text-center'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    )
  }
  else {
    if (status === true) {
      return (
        form.tableType === 'vertical' ? (
          <>
            <GeneralVerticalTable
              keys={Object.keys(data[0])}
              data={data.slice(current, current + viewSize)}
              current={current}></GeneralVerticalTable>
            <PaginationContainer
              navSize={navSize}
              viewSize={viewSize}
              navViewSize={navViewSize}
              current={current}
              currentPage={currentPage}></PaginationContainer>
          </>
        ) : form.tableType === 'horizontal' && (
          <>
            <GeneralHorizontalTable
              keys={Object.keys(data[0])}
              data={data.slice(current, current + viewSize)}
              current={current}></GeneralHorizontalTable>
            <PaginationContainer
              navSize={navSize}
              viewSize={viewSize}
              navViewSize={navViewSize}
              currentPage={currentPage}></PaginationContainer>
          </>
        )
      )
    }
    else {
      return (
        <>
          <h3>Result</h3>
          <p>API 테스트를 진행할 수 있습니다.</p>
        </>
      )
    }
  }
}

export default ToolBoxContainer;