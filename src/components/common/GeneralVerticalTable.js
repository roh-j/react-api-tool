import React from 'react';
import '../../resources/css/bootstrap.css';

const GeneralVerticalTable = ({ keys, data, current }) => {
  return (
    <table className='table table-bordered table-hover'>
      <thead className='thead-dark'>
        <tr>
          <th scope='col'>Key</th>
          <th scope='col'>Value</th>
        </tr>
      </thead>
      {
        data.map((ds, idx) => {
          return (
            <tbody key={idx}>
              <tr key={idx} className='table-warning'>
                <th colSpan='2' className='text-bold'>#{current + idx + 1}</th>
              </tr>
              {
                keys.map((key, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{key}</th>
                      <td>{JSON.stringify(ds[key])}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          )
        })
      }
    </table>
  )
}

export default GeneralVerticalTable;