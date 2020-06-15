import React from 'react';
import '../../resources/css/bootstrap.css';

const GeneralHorizontalTable = ({ keys, data, footer }) => {
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
          {
            footer.visible === true && (
              <tfoot>
                <tr>
                  {
                    footer.align === 'right' ? (
                      <td colSpan={keys.length} className='text-right'>{footer.contents}</td>
                    ) : (
                      <td colSpan={keys.length}>{footer.contents}</td>
                    )
                  }
                </tr>
              </tfoot>
            )
          }
      </table>
    </div>
  )
}

export default GeneralHorizontalTable;