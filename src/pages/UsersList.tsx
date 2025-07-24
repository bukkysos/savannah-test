import React, { useState } from 'react'
import { handleFetchUsers } from '../util/request';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '../components/pagination';
import { Table } from '../components/table';
import { Notification } from '../components/notification';

export const UsersList: React.FC = () => {
    const [pageNo, setPageNo] = useState<number>(1);

    const { data: usersData, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['users', pageNo],
        queryFn: () => handleFetchUsers(`https://savannah-backend-production.up.railway.app/users?page=${pageNo}`),
        enabled: !!pageNo,
        placeholderData: (prevData) => prevData,
        refetchOnWindowFocus: false
    });

    return (
        <div className="min-h-screen w-screen bg-white content-center px-2 sm:px-4 md:px-8 py-6 md:py-8">
            <Notification
                message={
                    isSuccess
                        ? "User data loaded successfully"
                        : "Failed to load users."
                }
                description={isError ? error?.message : usersData?.message}
                success={isSuccess}
                error={isError}
            />

            <div className="bg-white rounded-t-xl shadow border border-gray-200 overflow-x-auto">
                <Table isLoading={isLoading} tableData={usersData?.data?.data} />
            </div>
            {usersData?.data?.data &&
                <Pagination
                    currentPage={pageNo}
                    totalPages={usersData?.data?.totalPages}
                    onPageChange={setPageNo}
                />
            }
        </div>
    )
}