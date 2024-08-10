export class ResultModel<T> {
    data: T;
    pageNumber: number = 1;
    pageSize: number = 1;
    isFirstPage: boolean = false;
    isLastPage: boolean = false;
    totalPageCount: number = 0;
}