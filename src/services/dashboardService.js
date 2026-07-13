import dayjs from "dayjs";

import systemApiService from "./systemApiService";

const dashboardService = {

    async getMonthlyChart(year) {

        return await systemApiService.execute({

            apiCd: "GET_DASHBOARD_MONTHLY",
            type: "SEARCH",
            param01: year

        });

    }, 

    async getSummary() {

        return await systemApiService.execute({

            apiCd: "GET_DASHBOARD_SUMMARY",
            type: "SEARCH"

        });

    }, 

};


export default dashboardService;