import systemApiService from "./systemApiService";
import koreanService from "./koreanService";

import { getStorage, setStorage, removeStorage } from "../utils/storage";

import STORAGE_KEYS from "../utils/storageKeys";

const employeeService = {

    async refreshEmployees() {

        const employees = await systemApiService.execute({

            apiCd: "EMPLOYEE_LIST",

            type: "SEARCH"

        });

        setStorage(

            STORAGE_KEYS.EMPLOYEE,

            employees ?? []

        );

        return employees ?? [];

    },

    getEmployees() {

        return getStorage(

            STORAGE_KEYS.EMPLOYEE,

            []

        );

    },

    findEmployeeByRFID(rfid) {

        const employee = this.getEmployees().find(
            item => item.RF_ID === rfid
        );

        console.log("Employee :", employee);

        if (employee) {

            console.log("Ketemu employee");

            return employee;

        }

        const korean = koreanService.findByRFID(rfid);

        console.log("Korean :", korean);

        if (!korean) {

            console.log("Korean tidak ketemu");

            return null;

        }

        return korean;

    },

    findEmployeeByEmpId(empId) {

        return this.getEmployees().find(

            item => item.EMPID === empId

        ) ?? null;

    },

    clearEmployees() {

        removeStorage(

            STORAGE_KEYS.EMPLOYEE

        );

    }

};

export default employeeService;