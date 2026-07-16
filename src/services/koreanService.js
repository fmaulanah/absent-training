import systemApiService from "./systemApiService";

import {

    getStorage,
    setStorage,
    removeStorage

} from "../utils/storage";

import STORAGE_KEYS from "../utils/storageKeys";

const koreanService = {

    async refreshKoreans() {

        const koreans = await systemApiService.execute({

            apiCd: "KOREAN_LIST",
            type: "SEARCH"

        });

        setStorage(

            STORAGE_KEYS.KOREAN,

            koreans ?? []

        );

        return koreans ?? [];

    },

    getKoreans() {

        return getStorage(

            STORAGE_KEYS.KOREAN,

            []

        );

    },

    findByEmpId(empId) {

        return this.getKoreans().find(

            item => item.EMPID === empId

        ) ?? null;

    },

    findByRFID(rfid) {

        return this.getKoreans().find(

            item => item.RFID === rfid

        ) ?? null;

    },

    async saveCoach(data) {

        return await systemApiService.execute({

            apiCd: "SAVE_KOREAN",
            type: "SAVE",
            param01: data.empId,
            param02: data.empName,
            param03: data.rfid

        });

    },

    async deleteCoach(empId) {

        return await systemApiService.execute({

            apiCd: "DELETE_KOREAN",
            type: "SAVE",
            param01: empId,

        });

    },

    clear() {

        removeStorage(

            STORAGE_KEYS.KOREAN

        );

    }

};

export default koreanService;