/** 로그인 요청 */
export interface LoginRequest {
    email: string;
    password: string;
}

/** 토큰 재발급 요청 */
export interface RefreshRequest {
    refreshToken: string;
}


/** 로그아웃 요청 */
export interface LogoutRequest {
    refreshToken: string;
}

