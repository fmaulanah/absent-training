import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportAttendance(agenda, details) {

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Attendance");

    const thinBorder = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
    };

    //---------------------------------------------
    // Column Width
    //---------------------------------------------

    worksheet.columns = [

        { width: 6 },   // No
        { width: 15 },  // NIK
        { width: 35 },  // Nama
        { width: 40 },  // Department
        { width: 18 },  // Position
        { width: 18 },  // Phone
        { width: 12 },  // Scan In
        { width: 12 }   // Scan Out

    ];

    //---------------------------------------------
    // Header
    //---------------------------------------------

    worksheet.mergeCells("A1:H1");
    worksheet.getCell("A1").value = "PT. CHANG SHIN INDONESIA";
    worksheet.getCell("A1").font = {
        bold: true,
        size: 14
    };
    worksheet.getCell("A1").alignment = {
        horizontal: "center"
    };

    worksheet.mergeCells("A2:H2");
    worksheet.getCell("A2").value =
        "Jl. Dusun Gintungkolot RT 16/04 Desa Gintung Kerta Kec. Klari Kab. Karawang";
    worksheet.getCell("A2").alignment = {
        horizontal: "center"
    };

    worksheet.mergeCells("A3:H3");
    worksheet.getCell("A3").value =
        "West Java Indonesia";
    worksheet.getCell("A3").alignment = {
        horizontal: "center"
    };

    worksheet.mergeCells("A4:H4");
    worksheet.getCell("A4").value =
        "Phone : (0267) 8616633";
    worksheet.getCell("A4").alignment = {
        horizontal: "center"
    };

    worksheet.addRow([]);

    worksheet.mergeCells("A6:H6");
    worksheet.getCell("A6").value = "TRAINING DOCUMENTATION";
    worksheet.getCell("A6").font = {
        bold: true,
        size: 12
    };
    worksheet.getCell("A6").alignment = {
        horizontal: "center"
    };

    worksheet.addRow([]);

    //---------------------------------------------
    // Agenda Info
    //---------------------------------------------

    worksheet.getCell("A8").value = "Kind Of Agenda";
    worksheet.getCell("A9").value = "Date";
    worksheet.getCell("A10").value = "Place";
    worksheet.getCell("A11").value = "Wave";

    worksheet.getCell("C8").value = agenda.TRAINING_NAME;
    worksheet.getCell("C9").value = agenda.TRAINING_DATE;
    worksheet.getCell("C10").value = agenda.ROOM_NAME;
    worksheet.getCell("C11").value = "";

    worksheet.mergeCells("A8:B8");
    worksheet.mergeCells("A9:B9");
    worksheet.mergeCells("A10:B10");
    worksheet.mergeCells("A11:B11");

    worksheet.mergeCells("C8:H8");
    worksheet.mergeCells("C9:H9");
    worksheet.mergeCells("C10:H10");
    worksheet.mergeCells("C11:H11");

    // Border info

    for (let row = 8; row <= 11; row++) {

        for (let col = 1; col <= 8; col++) {

            worksheet.getCell(row, col).border = thinBorder;

        }

    }

    //Alignment

    for (let row = 8; row <= 11; row++) {

    worksheet.getCell(`A${row}`).font = {
            bold: true
        };

        worksheet.getCell(`A${row}`).alignment = {
            horizontal: "left",
            vertical: "middle"
        };

        worksheet.getCell(`C${row}`).alignment = {
            horizontal: "left",
            vertical: "middle"
        };

    }

    for (let row = 8; row <= 11; row++) {

        worksheet.getRow(row).height = 22;

    }

    worksheet.addRow([]);

    //---------------------------------------------
    // Header Table
    //---------------------------------------------

    worksheet.addRow([

        "No",
        "NIK",
        "Nama",
        "Department",
        "Posisi",
        "No HP",
        "Scan In",
        "Scan Out"

    ]);

    const tableHeaderRow = worksheet.lastRow;

    tableHeaderRow.height = 22;

    tableHeaderRow.eachCell(cell => {

        cell.font = {

            bold: true

        };

        cell.alignment = {

            horizontal: "center",
            vertical: "middle"

        };

        cell.border = thinBorder;

        cell.fill = {

            type: "pattern",
            pattern: "solid",
            fgColor: {

                argb: "FFD9D9D9"

            }

        };

    });

    //---------------------------------------------
    // Detail
    //---------------------------------------------

    details.forEach((item, index) => {

        const row = worksheet.addRow([

            index + 1,
            item.EMPID,
            item.EMP_NAME,
            item.DEPARTMENT,
            item.POSITION,
            item.PHONE_NO ?? "",
            item.SCAN_IN_TIME
                ? item.SCAN_IN_TIME.substring(11, 19)
                : "",
            item.SCAN_OUT_TIME
                ? item.SCAN_OUT_TIME.substring(11, 19)
                : ""

        ]);

        row.height = 22;

        row.eachCell(cell => {

            cell.border = thinBorder;

            cell.alignment = {

                vertical: "middle"

            };

        });

    });

    //---------------------------------------------
    // Sampai 28 baris
    //---------------------------------------------

    for (let i = details.length + 1; i <= 28; i++) {

        const row = worksheet.addRow([

            i,

            "",

            "",

            "",

            "",

            "",

            "",

            ""

        ]);

        row.height = 22;

        row.eachCell(cell => {

            cell.border = thinBorder;

            cell.alignment = {

                vertical: "middle"

            };

        });

        row.getCell(7).alignment = {
            horizontal: "center",
            vertical: "middle"
        };

        row.getCell(8).alignment = {
            horizontal: "center",
            vertical: "middle"
        };

    }

    //---------------------------------------------
    // Download
    //---------------------------------------------

    const buffer = await workbook.xlsx.writeBuffer();

    const agendaName = (agenda.TRAINING_NAME ?? "Agenda")
        .replace(/[\\/:*?"<>|]/g, "_");

    const agendaDate = (agenda.TRAINING_DATE ?? "")
        .replace(/-/g, "");

    saveAs(

        new Blob([buffer]),

        `${agendaDate}_${agendaName}.xlsx`

    );

}