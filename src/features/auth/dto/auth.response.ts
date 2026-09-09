/** 로그인 응답 */
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

/** 토큰 재발급 응답 */
export interface RefreshResponse {
    accessToken: string;
}

/** 로그아웃 응답  */
export interface LogoutResponse {
    loggedOut: true;
}