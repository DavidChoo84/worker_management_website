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

export interface Employee{
    id: string;
    name: string;
    photo: string;
}