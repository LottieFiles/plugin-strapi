import React from "react";

// @ts-ignore

import { Dots, Pagination } from '@strapi/design-system';

import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const PageButton = styled.button`
background: #FFFFFF;
box-shadow: 0px 1px 4px rgba(26, 26, 67, 0.1);
border-radius: 4px;
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 16px;

display: flex;

align-items: center;
text-align: center;
justify-content: center;
width: 32px;
height: 32px;

color: #271FE0;
`;

const LottiePagination = ({ disabled = false,
    limit,
    next,
    page,
    prev,
    total }) => {

    const offset = page * limit - limit;

    const currentPage = Math.ceil(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const hasNext = offset + limit < total;
    const hasPrev = offset >= limit;

    const prevDisabled = disabled || !hasPrev;
    const nextDisabled = disabled || !hasNext;


    return (
        <PaginationContainer>
            <Pagination pageCount={totalPages}>
                <PageButton disabled={prevDisabled} onClick={prev}>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 8.825L2.2915 5L6 1.175L4.8583 0L0 5L4.8583 10L6 8.825Z" fill="#666687" />
                    </svg>
                </PageButton>
                <PageButton>
                    {currentPage}
                </PageButton>
                <PageButton onClick={next}>
                    {currentPage + 1}
                </PageButton>
                <Dots />
                <PageButton onClick={next} disabled={nextDisabled}>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8.825L3.7085 5L0 1.175L1.1417 0L6 5L1.1417 10L0 8.825Z" fill="#666687" />
                    </svg>
                </PageButton>
            </Pagination>
        </PaginationContainer>
    );
};

export default LottiePagination;
