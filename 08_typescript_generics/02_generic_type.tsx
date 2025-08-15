

type Pagination<T> = {
    data: T;
    count: number;
    total: number;
    pages: number;
}

type Items = {
    id: number;
    name: string;
    email: string;
}

type Movies = {
    id: number;
    title: string;
    year: number;
}


type UserPagination = Pagination<Items>;
type MoviePagination = Pagination<Movies>;


// Follow up: differences between type and interface