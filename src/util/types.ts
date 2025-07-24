export interface newPostFormValuesProps {
    title: string;
    body: string;
}

export interface PostsProps {
    id: string
    title: string
    body: string
}

export interface UserProps {
    id: string,
    name: string,
    email: string,
    address: string,
};

export interface TableProps {
    isLoading: boolean;
    tableData: UserProps[];
};

export interface NewPostModalProps {
    open: boolean;
    onClose: () => void;
    publishing: boolean;
    onPublish: (values: newPostFormValuesProps) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface NotificationProps {
  message: string;
  description?: string;
  publishingSuccess?: boolean;
  publishingError?: boolean;
  success: boolean;
  error: boolean;
}