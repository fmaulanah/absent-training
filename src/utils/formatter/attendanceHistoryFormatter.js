import dayjs from "dayjs";

export const formatTrainingDate = (value) => {

    if (!value) {

        return "-";

    }

    return dayjs(value, "YYYYMMDD").format("DD MMM YYYY");

};

export const formatStatus = (value) => {

    switch (value) {

        case "I":
            return {

                label: "Scan In",

                color: "warning"

            };

        case "O":
            return {

                label: "Scan Out",

                color: "info"

            };

        case "F":
            return {

                label: "Finished",

                color: "success"

            };

        default:

            return {

                label: "-",

                color: "default"

            };

    }

};

export const formatCompletion = (scanIn, scanOut) => {

    if (!scanIn) {

        return "0%";

    }

    return `${Math.round((scanOut / scanIn) * 100)}%`;

};

export const displayValue = (value) => {

    return value || "-";

};

export const formatYesNo = (value) => {

    return value === "Y"
        ? "✔"
        : "✖";

};