import React from 'react';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { paging } from '../modules/tool';

const PaginationContainer = ({ navSize, viewSize, navViewSize, current, currentPage }) => {
  const dispatch = useDispatch();

  let nav = []
  const navStart = ((currentPage - 1) * navViewSize);
  const navEnd = (currentPage * navViewSize);

  for (let i = 0; i < navSize; i++) {
    nav.push(i * viewSize);
  }

  const onPage = (e, current) => {
    e.preventDefault();

    const currentPage = parseInt(current / (viewSize * navViewSize)) + 1;

    dispatch(
      paging({
        current: current,
        currentPage: currentPage,
      })
    )
  }

  return (
    <nav>
      <ul className='pagination'>
        {
          current > 0 ? (
            <li key={uuid()} className='page-item'>
              <Link className='page-link' to='#' aria-label='Previous' onClick={(e) => onPage(e, current - viewSize)}>
                <span aria-hidden='true'>&laquo;</span>
              </Link>
            </li>
          ) : (
              <li key={uuid()} className='page-item disabled'>
                <Link className='page-link' to='#' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                </Link>
              </li>
            )
        }
        {
          nav.slice(navStart, navEnd).map((item, idx) => {
            if (item === current) {
              return (
                <li key={uuid()} className='page-item active' aria-current='page'>
                  <span className='page-link'>
                    {((currentPage - 1) * navViewSize) + idx + 1}
                    <span className='sr-only'>(current)</span>
                  </span>
                </li>
              )
            }
            else {
              return (
                <li key={uuid()} className='page-item'>
                  <Link className='page-link' to='#' onClick={(e) => onPage(e, item)}>{((currentPage - 1) * navViewSize) + idx + 1}</Link>
                </li>
              )
            }
          })
        }
        {
          (navSize * viewSize) > (current + viewSize) ? (
            <li key={uuid()} className='page-item'>
              <Link className='page-link' to='#' aria-label='Next' onClick={(e) => onPage(e, current + viewSize)}>
                <span aria-hidden='true'>&raquo;</span>
              </Link>
            </li>
          ) : (
              <li key={uuid()} className='page-item disabled'>
                <Link className='page-link' to='#' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                </Link>
              </li>
            )
        }
      </ul>
    </nav>
  )
}

export default PaginationContainer;