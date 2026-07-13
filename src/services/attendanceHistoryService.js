import dayjs from "dayjs";

import systemApiService from "./systemApiService";

const attendanceHistory = {

    async getHistory(filter) {

        return await systemApiService.execute({

            apiCd: "GET_ATTENDANCE_HISTORY",
            type: "SEARCH",
            param01: dayjs(filter.fromDate).format("YYYYMMDD"),
            param02: dayjs(filter.toDate).format("YYYYMMDD"),
            param03: filter.training,
            param04: filter.trainer,
            param05: filter.status

        });

    },

    async getHistoryDetail(scheduleId) {

        return await systemApiService.execute({

            apiCd: "GET_ATTENDANCE_HISTORY_DETAIL",
            type: "SEARCH",
            param01: scheduleId

        });

    }

};

export default attendanceHistory;