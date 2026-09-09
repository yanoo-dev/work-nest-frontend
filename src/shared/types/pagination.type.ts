/** 목록 응답 */
export interface Pagination<T> {
    /** 목록 데이터 */
    items: T[];
    /** 전체 건수 */
    total: number;
    /** 현재 페이지 번호 */
    page: number;
    /** 페이지당 건수 */
    size: number;
}