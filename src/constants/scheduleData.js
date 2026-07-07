import dayjs from "dayjs";

export const createDummyTrainings = () => {

    const currentMonth = dayjs().startOf("month");

    return [

        {
            id: 1,
            title: "Safety Induction",
            startDate: currentMonth.date(2).format("YYYY-MM-DD"),
            endDate: currentMonth.date(2).format("YYYY-MM-DD"),
            room: "TR01",
            trainerId: "23070001",
            trainerName: "Budi Santoso",
            memo: "Training keselamatan kerja untuk karyawan baru.",
            useYn: "Y"
        },

        {
            id: 2,
            title: "Leadership Training",
            startDate: currentMonth.date(4).format("YYYY-MM-DD"),
            endDate: currentMonth.date(4).format("YYYY-MM-DD"),
            room: "TR02",
            trainerId: "23070002",
            trainerName: "Siti Rahma",
            memo: "Leadership dasar untuk Supervisor.",
            useYn: "Y"
        },

        {
            id: 3,
            title: "Fire Fighting",
            startDate: currentMonth.date(6).format("YYYY-MM-DD"),
            endDate: currentMonth.date(6).format("YYYY-MM-DD"),
            room: "TR03",
            trainerId: "23070003",
            trainerName: "Andi Wijaya",
            memo: "Simulasi penggunaan APAR.",
            useYn: "Y"
        },

        {
            id: 4,
            title: "5S Awareness",
            startDate: currentMonth.date(8).format("YYYY-MM-DD"),
            endDate: currentMonth.date(8).format("YYYY-MM-DD"),
            room: "TR01",
            trainerId: "23070004",
            trainerName: "Rudi Hartono",
            memo: "Penerapan budaya 5S.",
            useYn: "Y"
        },

        {
            id: 5,
            title: "Quality Awareness",
            startDate: currentMonth.date(10).format("YYYY-MM-DD"),
            endDate: currentMonth.date(10).format("YYYY-MM-DD"),
            room: "TR05",
            trainerId: "23070005",
            trainerName: "Yuni Astuti",
            memo: "Pengenalan kualitas produk.",
            useYn: "Y"
        },

        {
            id: 6,
            title: "First Aid Training",
            startDate: currentMonth.date(12).format("YYYY-MM-DD"),
            endDate: currentMonth.date(12).format("YYYY-MM-DD"),
            room: "TR02",
            trainerId: "23070006",
            trainerName: "Fajar Nugroho",
            memo: "Pertolongan pertama pada kecelakaan kerja.",
            useYn: "Y"
        },

        {
            id: 7,
            title: "Forklift Safety",
            startDate: currentMonth.date(15).format("YYYY-MM-DD"),
            endDate: currentMonth.date(15).format("YYYY-MM-DD"),
            room: "TR04",
            trainerId: "23070007",
            trainerName: "Dewi Lestari",
            memo: "Keselamatan operator forklift.",
            useYn: "Y"
        },

        {
            id: 8,
            title: "Chemical Handling",
            startDate: currentMonth.date(18).format("YYYY-MM-DD"),
            endDate: currentMonth.date(18).format("YYYY-MM-DD"),
            room: "TR03",
            trainerId: "23070008",
            trainerName: "Ahmad Fauzi",
            memo: "Penanganan bahan kimia berbahaya.",
            useYn: "Y"
        },

        {
            id: 9,
            title: "Machine Safety",
            startDate: currentMonth.date(21).format("YYYY-MM-DD"),
            endDate: currentMonth.date(21).format("YYYY-MM-DD"),
            room: "TR01",
            trainerId: "23070009",
            trainerName: "Rina Marlina",
            memo: "Keselamatan pengoperasian mesin produksi.",
            useYn: "Y"
        },

        {
            id: 10,
            title: "ISO 9001 Awareness",
            startDate: currentMonth.date(23).format("YYYY-MM-DD"),
            endDate: currentMonth.date(23).format("YYYY-MM-DD"),
            room: "TR05",
            trainerId: "23070010",
            trainerName: "Agus Prasetyo",
            memo: "Pengenalan sistem manajemen mutu ISO 9001.",
            useYn: "Y"
        },

        {
            id: 11,
            title: "Problem Solving",
            startDate: currentMonth.date(26).format("YYYY-MM-DD"),
            endDate: currentMonth.date(26).format("YYYY-MM-DD"),
            room: "TR02",
            trainerId: "23070011",
            trainerName: "Lina Kusuma",
            memo: "Metode penyelesaian masalah menggunakan PDCA.",
            useYn: "Y"
        },

        {
            id: 12,
            title: "Kaizen Improvement",
            startDate: currentMonth.date(29).format("YYYY-MM-DD"),
            endDate: currentMonth.date(29).format("YYYY-MM-DD"),
            room: "TR04",
            trainerId: "23070012",
            trainerName: "Eko Saputra",
            memo: "Continuous Improvement dan Kaizen.",
            useYn: "Y"
        }

    ];

};