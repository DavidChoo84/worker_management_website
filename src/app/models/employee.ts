export interface EmployeeReport {
    id: string;
    gender: string;
    name: string;
    passportNo: string;
    socsoId: string;
    basicPay: number;
    overtime: number;
    restDayOT: number;
    publicOT: number;
    empSocso: number;
    empEis: number;
    totalEarnings: number;
    //totalDeductions: number;
    nett: number;
}

export interface Employee {
    id: string;
    name: string;
    photo: string;
}

export interface EmployeeClockInOut {
    emp_id: string;
    max_clockType: string;
    max_date: Date;
    max_zoneId: number;
    max_zoneName: string;
    min_clockType: string;
    min_date: Date;
    min_zoneId: number;
    min_zoneName: string;
    totalWorkingHours: number;
}