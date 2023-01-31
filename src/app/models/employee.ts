export interface EmployeeReport {
    id: string;
    gender: string;
    name: string;
    passportNo: string;
    socsoId: string;
    basicPay: number;
    overtime: number;
    empSocso: number;
    empEis: number;
    totalEarnings: number;
    //totalDeductions: number;
    nett: number;
}