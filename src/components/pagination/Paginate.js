import React, { useState, useEffect } from 'react';

import './Paginate.scss';

const Paginate = (props) => {
	const { currentPage, totalPages, paginate } = props;
	const [page, setPage] = useState();
	const [totalPage, setTotalPage] = useState();

	useEffect(() => {
		setPage(currentPage);
		setTotalPage(totalPages);
	}, [currentPage, totalPages]);

    return (
        <>
			<span className="pageCount">{page} - {totalPage}</span>
			<button 
                    className={page > 1 ? 'paginate-button' : 'paginate-button disable'}
                    onClick={() => paginate('prev')}
			>
				Prev
			</button>
			<button 
				className={page === totalPage ? 'paginate-button disable' : 'paginate-button'}
				onClick={() => paginate('next')}
			>
				Next
			</button>
		</>
    )
}

export default Paginate;
