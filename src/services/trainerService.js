import systemApiService from "./systemApiService";

const trainerService = {

    async getTrainer(empId) {

        const result = await systemApiService.execute({

            apiCd: "TRAINER_LIST",

            type: "SEARCH",

            param01: empId

        });

        return result;

    }

};

export default trainerService;