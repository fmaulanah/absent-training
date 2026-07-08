import trainingService from "./trainingService";

const attendanceService = {

    async getTrainings(month) {

        return await trainingService.getTrainings(month);

    }

};

export default attendanceService;