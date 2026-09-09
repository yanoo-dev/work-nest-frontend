import type { RoleName } from '../model/user.type';

/** 사이드바 관리자 메뉴 노출여부 */
export interface RoleSummary {
    name: RoleName;
}

/** 부서 요약 정보 */
export interface DepartmentSummary {
    /** 부서코드 */
    code: string;
    /** 부서명 */
    name: string;
}

/** 직급 요약 */
export interface PositionSummary {
    /** 직급명 */
    name: string;
    /** 직급 순위 */
    level: number;
}

/** 실시간 업무 상태 */
export interface CurrentStatusSummary {
    /** 업무 상태 */
    status: string;
    /** 상태 메모 */
    note: string | null;
    /** 상태 시작 일시 */
    startedAt: string;
}

/** 내 정보 응답 */
export interface MeResponse {
    /** 아이디 */
    id: string;
    /** 사원번호 */
    employeeNumber: string;
    /** 이름 */
    name: string;
    /** 이메일 */
    email: string;
    /** 전화번호 */
    phone: string | null;
    /** 프로필 이미지 경로 */
    profileImageUrl: string | null;
    /** 재직상태 */
    status: string;
    /** 입사일 */
    joinedAt: string;
    /** 권한 */
    role: RoleSummary;
    /** 부서, 게스트 null */
    department: DepartmentSummary | null;
    /** 직급, 게스트 null 처리 */
    position: PositionSummary | null;
    /** 실시간 업무 상태, 미설정 시 null */
    currentStatus: CurrentStatusSummary | null;
}
