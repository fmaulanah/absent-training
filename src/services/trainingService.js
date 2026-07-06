import systemApiService from "./systemApiService";

const trainingService = {

    async getSchedule() {

        return await systemApiService.execute({

            apiCd: "ISI_NANTI",

            type: "LIST"

        });

    }

};

export default trainingService;