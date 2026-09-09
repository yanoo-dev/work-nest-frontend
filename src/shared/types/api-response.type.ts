/** 응답 성공  */
export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

/** 응답 실패 */
export interface ApiErrorResponse {
    success: false;
    message: string;
    errorCode?: string;
    errors?: string[];
}

/** 응답 타입 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;