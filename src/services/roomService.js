import systemApiService from "./systemApiService";

const roomService = {

    async getRooms() {

        return await systemApiService.execute({

            apiCd: "ROOM_LIST",

            type: "SEARCH"

        });

    }

};

export default roomService;