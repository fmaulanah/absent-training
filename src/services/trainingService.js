import dayjs from "dayjs";

import systemApiService from "./systemApiService";

const trainingService = {

    async getTrainings(month) {

        return await systemApiService.execute({

            apiCd: "TRAINING_LIST",
            type: "SEARCH",
            param01: month

        });

    }, 

    async saveTraining(form, roomName) {

        const loginUser = JSON.parse(

            localStorage.getItem("csg_user")

        );

        console.log({
            apiCd: "SAVE_TRAINING",
            type: "SAVE",
            param01: form.title,
            param02: dayjs(form.startDate).format("YYYYMMDD"),
            param03: dayjs(form.endDate).format("YYYYMMDD"),
            param04: form.room,
            param05: roomName,
            param06: form.trainerId,
            param07: form.trainerName,
            param08: form.memo,
            param09: form.useYn,
            param10: loginUser?.EMPID
        });

        return await systemApiService.execute({

            apiCd: "SAVE_TRAINING",
            type: "SAVE",
            param01: form.title,
            param02: dayjs(form.startDate).format("YYYYMMDD"),
            param03: dayjs(form.endDate).format("YYYYMMDD"),
            param04: form.room,
            param05: roomName,
            param06: form.trainerId,
            param07: form.trainerName,
            param08: form.memo,
            param09: form.useYn,
            param10: loginUser?.EMPID ?? ""
        });

    },

    async updateTraining(scheduleId, form, roomName) {

        const loginUser = JSON.parse(

            localStorage.getItem("csg_user")

        );

        return await systemApiService.execute({

            apiCd: "UPDATE_TRAINING",

            type: "SAVE",

            param01: scheduleId,

            param02: form.title,

            param03: dayjs(form.startDate).format("YYYYMMDD"),

            param04: dayjs(form.endDate).format("YYYYMMDD"),

            param05: form.room,

            param06: roomName,

            param07: form.trainerId,

            param08: form.trainerName,

            param09: form.memo,

            param10: form.useYn,

            param11: loginUser?.EMPID ?? ""

        });

    }

};


export default trainingService;