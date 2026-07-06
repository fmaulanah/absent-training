import dayjs from "dayjs";

export const createDummyTrainings = () => {

    const currentMonth = dayjs().startOf("month");

    return [

        {
            id: 1,
            title: "Safety Induction",
            date: currentMonth.date(2).format("YYYY-MM-DD"),
            time: "08:00",
            room: "TR01",
            trainerId: "23070001",
            trainerName: "Budi Santoso"
        },

        {
            id: 2,
            title: "Leadership Training",
            date: currentMonth.date(4).format("YYYY-MM-DD"),
            time: "09:00",
            room: "TR02",
            trainerId: "23070002",
            trainerName: "Siti Rahma"
        },

        {
            id: 3,
            title: "Fire Fighting",
            date: currentMonth.date(6).format("YYYY-MM-DD"),
            time: "13:00",
            room: "TR03",
            trainerId: "23070003",
            trainerName: "Andi Wijaya"
        },

        {
            id: 4,
            title: "5S Awareness",
            date: currentMonth.date(8).format("YYYY-MM-DD"),
            time: "08:30",
            room: "TR01",
            trainerId: "23070004",
            trainerName: "Rudi Hartono"
        },

        {
            id: 5,
            title: "Quality Awareness",
            date: currentMonth.date(10).format("YYYY-MM-DD"),
            time: "10:00",
            room: "TR05",
            trainerId: "23070005",
            trainerName: "Yuni Astuti"
        },

        {
            id: 6,
            title: "First Aid Training",
            date: currentMonth.date(12).format("YYYY-MM-DD"),
            time: "13:00",
            room: "TR02",
            trainerId: "23070006",
            trainerName: "Fajar Nugroho"
        },

        {
            id: 7,
            title: "Forklift Safety",
            date: currentMonth.date(15).format("YYYY-MM-DD"),
            time: "08:00",
            room: "TR04",
            trainerId: "23070007",
            trainerName: "Dewi Lestari"
        },

        {
            id: 8,
            title: "Chemical Handling",
            date: currentMonth.date(18).format("YYYY-MM-DD"),
            time: "09:30",
            room: "TR03",
            trainerId: "23070008",
            trainerName: "Ahmad Fauzi"
        },

        {
            id: 9,
            title: "Machine Safety",
            date: currentMonth.date(21).format("YYYY-MM-DD"),
            time: "08:30",
            room: "TR01",
            trainerId: "23070009",
            trainerName: "Rina Marlina"
        },

        {
            id: 10,
            title: "ISO 9001 Awareness",
            date: currentMonth.date(23).format("YYYY-MM-DD"),
            time: "10:00",
            room: "TR05",
            trainerId: "23070010",
            trainerName: "Agus Prasetyo"
        },

        {
            id: 11,
            title: "Problem Solving",
            date: currentMonth.date(26).format("YYYY-MM-DD"),
            time: "13:00",
            room: "TR02",
            trainerId: "23070011",
            trainerName: "Lina Kusuma"
        },

        {
            id: 12,
            title: "Kaizen Improvement",
            date: currentMonth.date(29).format("YYYY-MM-DD"),
            time: "09:00",
            room: "TR04",
            trainerId: "23070012",
            trainerName: "Eko Saputra"
        }

    ];

};