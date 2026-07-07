import systemApiService from "./systemApiService";

const roomService = {

    async getRooms() {

        return await systemApiService.execute({

            apiCd: "COMBO_ROOM",

            type: "SEARCH"

        });

    }

};

export default roomService;