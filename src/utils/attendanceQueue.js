import {
    getStorage,
    setStorage,
    removeStorage
} from "./storage";

import dayjs from "dayjs";

import STORAGE_KEYS from "./storageKeys";

const attendanceQueue = {

    getQueue() {

        return getStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,

            []

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

        const queues = this.getQueue();

        queues.push(queue);

        setStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,

            queues

        );

        return {

            success: true,

            data: queues

        };

    },

    removeQueue(empId) {

        const queue = this.getQueue().filter(

            item => item.EMPID !== empId

        );

        setStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,

            queue

        );

        return queue;

    },

    hasQueue({ empId, scheduleId, scanType}) 
    {

        return this.getQueue().some(item =>

            item.SCAN_EMPID === empId &&
            item.SCHEDULE_ID === scheduleId &&
            item.SCAN_TYPE === scanType

        );

    },

    getCount() {

        return this.getQueue().length;

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

        setStorage(

            STORAGE_KEYS.ATTENDANCE_QUEUE,

            queue

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