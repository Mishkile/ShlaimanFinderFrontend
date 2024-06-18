import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

// Custom styles to hide the arrows
const CustomPagination = styled(Pagination)({
    '& .MuiPaginationItem-previousNext': {
        display: 'none',
    },
});

const days = ["Thursday", "Friday", "Saturday", "Sunday"];

function MyPagination({ setSelectedDay }) {
    return (
       
        <CustomPagination
            className='MuiPagination-root'
            size='large'
            onChange={(e, p) => setSelectedDay(p === 1 ? "first" : p === 2 ? "second" : p === 3 ? "third" : "fourth")}
            count={4}
            color="primary"
            sx={{ height: "50px" }}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    page={days[item.page - 1]}
                />
            )}
        />



        
    );
}

export default MyPagination;
