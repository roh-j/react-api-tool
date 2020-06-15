import React from 'react';
import ToolBoxContainer from '../container/ToolBoxContainer';
import ToolResultContainer from '../container/ToolResultContainer';
import Header from '../components/common/Header';

const ToolMainPage = () => {
  return (
    <>
      <Header />
      <div className='App container'>
        <div className='row'>
          <div className='col-md-12'>
            <ToolBoxContainer />
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-12'>
            <ToolResultContainer />
          </div>
        </div>
        <hr />
        <p className='text-right'>Developed by roh-j</p>
      </div>
    </>
  )
}

export default ToolMainPage;