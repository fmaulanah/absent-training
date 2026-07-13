import {
    getStorage,
    setStorage,
    removeStorage
} from "./storage";

import dayjs from "dayjs";

import STORAGE_KEYS from "./storageKeys";

const attendanceQueue = {

    getQueue() {

        const storage = getStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,
            null

        );

        if (!storage) {

            return [];

        }

        if (Array.isArray(storage)) {

            return storage;

        }

        return storage.items ?? [];

    },

    getQueueInfo() {

        const storage = getStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,

            null

        );

        if (!storage) {

            return null;

        }
        
        storage.scheduleId ??= null;
        storage.scheduleName ??= "";
        storage.status ??= "SCAN_IN";
        storage.items ??= [];

        return storage;

    },

    getScheduleId() {

        return this.getQueueInfo()?.scheduleId ?? null;

    },

    getScheduleName() {

        return this.getQueueInfo()?.scheduleName ?? "";

    },

    getCount() {

        return this.getQueue().length;

    },

    getStatus() {

        return this.getQueueInfo()?.status ?? "SCAN_IN";

    },

    getNotUploadedQueue() {

        return this.getQueue();

    },

    getProgress({

        scheduleId,

        scanType

    }) {

        const queue = this.getQueue().filter(item =>

            item.SCHEDULE_ID === scheduleId &&
            item.SCAN_TYPE === scanType

        );

        return {

            uploaded: 0,

            scanned: queue.length

        };

    },

    removeUploaded(uploadedQueue) {

        const remain = this.getQueue().filter(item =>

            !uploadedQueue.some(uploaded =>

                uploaded.SCHEDULE_ID === item.SCHEDULE_ID &&
                uploaded.SCAN_EMPID === item.SCAN_EMPID &&
                uploaded.SCAN_TYPE === item.SCAN_TYPE &&
                uploaded.SCAN_DTTM === item.SCAN_DTTM

            )

        );

        this.replaceQueue(remain);

    },

    // markUploaded(uploadedQueue) {

    //     const queue = this.getQueue();

    //     uploadedQueue.forEach(uploaded => {

    //         const item = queue.find(scan =>

    //             scan.SCHEDULE_ID === uploaded.SCHEDULE_ID &&
    //             scan.SCAN_EMPID === uploaded.SCAN_EMPID &&
    //             scan.SCAN_TYPE === uploaded.SCAN_TYPE &&
    //             scan.SCAN_DTTM === uploaded.SCAN_DTTM

    //         );

    //         if (item) {

    //             item.UPLOADED_YN = "Y";

    //         }

    //     });

    //     this.replaceQueue(queue);

    // },

    setStatus(status) {

        const storage = this.getQueueInfo();

        if (!storage) {

            return;

        }

        storage.status = status;

        setStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,

            storage

        );

    },

    addQueue(queue) {

        if (

            this.hasQueue({

                empId: queue.SCAN_EMPID,
                scheduleId: queue.SCHEDULE_ID,
                scanType: queue.SCAN_TYPE

            })

        ) {

            return {

                success: false,
                message: "Peserta sudah melakukan scan."

            };

        }

        let storage = this.getQueueInfo();

        if (!storage) {

            storage = {

                scheduleId: queue.SCHEDULE_ID,
                scheduleName: queue.SCHEDULE_NM,
                status: "SCAN_IN",
                items: []

            };

        }

        if (storage.scheduleId !== queue.SCHEDULE_ID) {

            return {

                success: false,
                message: `Masih ada attendance "${storage.scheduleName}" yang belum diupload.`

            };

        }

        storage.items.push(queue);

        setStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,
            storage

        );

        return {

            success: true,
            data: storage.items

        };

    },

    removeQueue(empId) {

        const queue = this.getQueue().filter(

            item => item.SCAN_EMPID  !== empId

        );

        this.replaceQueue(queue);

    },

    hasQueue({ empId, scheduleId, scanType}) 
    {

        return this.getQueue().some(item =>

            item.SCAN_EMPID === empId &&
            item.SCHEDULE_ID === scheduleId &&
            item.SCAN_TYPE === scanType

        );

    },

    hasPendingUpload() {

        return this.getQueue().length > 0;

    },

    clearQueue() {

        removeStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE

        );

    },

    createQueue({ employee, training, scanType, manualYn = "N", memo = ""}) 
    {
        return {

            SCAN_DATE: dayjs().format("YYYYMMDD"),
            SCAN_DTTM: dayjs().toISOString(),
            SCAN_TYPE: scanType,
            SCAN_RF_ID: employee.RF_ID,
            SCAN_EMPID: employee.EMPID,
            SCAN_EMP_NM: employee.EMP_NAME,
            SCAN_POSITION: employee.POSITION,
            SCAN_DEPT_NM: employee.DEPT_NAME,
            SCHEDULE_ID: training.id,
            SCHEDULE_NM: training.title,
            ROOM_ID: training.room,
            ROOM_NAME: training.roomName,
            TRAINER_EMPID: training.trainerId,
            TRAINER_EMP_NM: training.trainerName,
            MANUAL_YN: manualYn,
            MEMO: memo

        };

    },

    replaceQueue(queue) {

        if (!queue.length) {

            this.clearQueue();
            return;

        }

        const oldStorage = this.getQueueInfo();

        const storage = {

            scheduleId: queue[0].SCHEDULE_ID,

            scheduleName: oldStorage?.scheduleName ?? queue[0].SCHEDULE_NM,

            status: oldStorage?.status ?? "SCAN_IN",

            items: queue

        };

        setStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,
            storage

        );

    },

    countQueue({ scheduleId, scanType}) 
    {

        return this.getQueue().filter(item =>

            item.SCHEDULE_ID === scheduleId &&
            item.SCAN_TYPE === scanType

        ).length;

    },

};

export default attendanceQueue;