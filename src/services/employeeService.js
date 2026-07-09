import systemApiService from "./systemApiService";

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

        return this.getEmployees().find(

            item => item.RF_ID === rfid

        ) ?? null;

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