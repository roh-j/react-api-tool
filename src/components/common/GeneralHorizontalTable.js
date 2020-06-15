import React from 'react';
import '../../resources/css/bootstrap.css';

const GeneralHorizontalTable = ({ keys, data }) => {
  return (
    <div className='table-responsive'>
      <table className='table table-bordered table-hover'>
        <thead className='thead-dark'>
          <tr>
            {
              keys.map((key, idx) => {
                return (
                  <th key={idx} scope='col'>{key}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((ds, idx) => {
              return (
                <tr key={idx}>
                  {
                    keys.map((key, idx) => {
                      return (
                        <td key={idx}>{JSON.stringify(ds[key])}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default GeneralHorizontalTable;