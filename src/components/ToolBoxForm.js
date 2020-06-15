import React from 'react';
import '../resources/css/bootstrap.css';

const ToolBoxForm = ({ form, onChange, onSubmit, loaded }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='form-row'>
          <div className='form-group col-md-3'>
            <label htmlFor='apiType'>API 타입</label>
            <select className='custom-select'
              id='apiType'
              name='apiType'
              value={form.apiType}
              onChange={onChange}>
              <option value='general'>General</option>
            </select>
          </div>
          <div className='form-group col-md-3'>
            <label htmlFor='tableType'>Table 타입</label>
            <select className='custom-select'
              id='tableType'
              name='tableType'
              value={form.tableType}
              onChange={onChange}>
              <option value='vertical'>세로형</option>
              <option value='horizontal'>가로형</option>
            </select>
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='apiUrl'>API 주소</label>
            <input type='text' className='form-control'
              id='apiUrl'
              name='apiUrl'
              value={form.apiUrl}
              onChange={onChange}></input>
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-3'>
            <label htmlFor='duplicateData'>Data 복제</label>
            <input type='text' className='form-control'
              id='duplicateData'
              name='duplicateData'
              value={form.duplicateData}
              onChange={onChange}></input>
          </div>
        </div>
        <div className='form-group text-right'>
          <button type='submit' className='btn btn-primary'>요청</button>
        </div>
      </form>
    </>
  )
}

export default ToolBoxForm;