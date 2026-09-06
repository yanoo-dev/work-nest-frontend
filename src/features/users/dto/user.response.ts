import type { RoleName } from '../model/user.type';

/**
 * 권한 요약
 *
 * 사이드바의 관리자 메뉴 노출 여부를 name 으로 판단한다.
 * UUID(role.id)는 화면에 쓰지 않아 응답에서 제외된다.
 */
export interface RoleSummary {
    name: RoleName;
}

/**
 * 부서 요약
 *
 * code 가 사용자에게 보여주는 조합형 식별자다.
 * 화면 기본 표기는 name, 필요 시 `개발팀 (DEV)` 형태로 함께 쓴다.
 */
export interface DepartmentSummary {
    code: string;
    name: string;
}
