import systemApiService from "./systemApiService";

const calendarService = {

    async getHoliday(year) {

        return await systemApiService.execute({

            apiCd: "CALENDAR_HOLI",

            type: "SEARCH",

            param01: year

        });

    }

};

export default calendarService;