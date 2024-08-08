public class BI_PSPB_ActionTaskService {

    public static Task getTask(String recordId) {
        return [
            SELECT Id, Status, WhatId
            FROM Task
            WHERE Id = :recordId
            LIMIT 1
        ];
    }
}