import systemApiService from "./systemApiService";

const trainerService = {

    async getTrainer(empId) {

        const result = await systemApiService.execute({

            apiCd: "COMBO_TRAINER",

            type: "SEARCH",

            param01: empId

        });

        return result;

    }

};

export default trainerService;