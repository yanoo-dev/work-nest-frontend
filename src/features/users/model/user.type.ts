/**
 * 권한 이름
 *
 * 백엔드 roles 테이블의 name 값. 이 4개 말고는 올 수 없다.
 * 유니온 타입이라 interface 로는 못 만들고 type 으로만 만들 수 있다.
 */
export type RoleName = 'GUEST' | 'USER' | 'MANAGER' | 'ADMIN';
