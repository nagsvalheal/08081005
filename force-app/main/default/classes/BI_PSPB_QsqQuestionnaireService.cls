public with sharing class BI_PSPB_QsqQuestionnaireService {
    /**
    * @description  Used to create task when a video is uploaded and calling the
    * method to send sms and email.
    */
    public static void processQsqQuestionnaires() {
        try {
            List<Task> newTaskList = new List<Task>();
            List<Id> enrolleeSendQsqOneIds = new List<Id>();
            List<Id> enrolleeSendQsqTwoIds = new List<Id>();

            Set<Id> enrolleeIds = BI_PSPB_EnrolleeFetcher.fetchEnrolleeIds();

            if (!enrolleeIds.isEmpty()) {
                Integer qsqCount = BI_PSPB_QuestionsDaysCountFetcher.fetchQsqCount();
                Integer qsq2Count = 2;
                List<Id> enrolleeQsqOneIds = BI_PSPB_QsqEnrolleeProcessor.processEnrollees(enrolleeIds, qsqCount);
                List<Id> enrolleeQsqTwoIds = BI_PSPB_QsqEnrolleeProcessor.processEnrollees(enrolleeIds, qsq2Count);

                processQsq(enrolleeQsqOneIds, BI_PSPB_NotificatinRmdConstantsCtrl.qsqQuestionName, 
                           System.Label.BI_PSPB_ActionWpaiNotification, BI_PSPB_NotificatinRmdConstantsCtrl.qsq, 
                           BI_PSPB_NotificatinRmdConstantsCtrl.actionTypeNotificatonTypeAction);

                processQsq(enrolleeQsqTwoIds, BI_PSPB_NotificatinRmdConstantsCtrl.qsqQuestionName, 
                           System.Label.BI_PSPB_ActionWpaiNotification, BI_PSPB_NotificatinRmdConstantsCtrl.dlqi, 
                           BI_PSPB_NotificatinRmdConstantsCtrl.actionTypeNotificatonTypeAction);
            } else {
                BI_PSP_LogMessagesUtility.logError(
                    BI_PSPB_NotificatinRmdConstantsCtrl.errorMsgRecordNotFound,
                    BI_PSPB_QsqQuestionnaireService.class.toString(),
                    false,
                    BI_PSPB_NotificatinRmdConstantsCtrl.severityError
                );
            }
        } catch (Exception ex) {
            BI_PSP_LogMessagesUtility.exceptionLogMessage(
                BI_PSPB_NotificatinRmdConstantsCtrl.recordNotFound,
                BI_PSPB_QsqQuestionnaireService.class.toString(),
                ex
            );
        }
    }

   /**
    * @description  Used to create task when a video is uploaded and calling the
    * method to send sms and email.
    */
    private static void processQsq(List<Id> enrolleeQsqIds, String questionName, String actionLabel, String notificationType, String actionType) {
        if (!enrolleeQsqIds.isEmpty()) {
            List<Id> enrolleeSendQsqIds = BI_PSPB_AssessmentFetcher.fetchDueAssessments(enrolleeQsqIds, questionName);
            BI_PSPB_TaskParameters params = new BI_PSPB_TaskParameters(
                actionLabel,
                actionType,
                notificationType,
                '',
                actionType
            );
            
            List<Task> newTaskList = BI_PSPB_TaskCreationCtrl.createTasks(enrolleeSendQsqIds, params);

            BI_PSP_DatabaseOperationsUtility.insertOperation(
                newTaskList,
                BI_PSPB_QsqQuestionnaireService.class.toString(),
                false
            );
            BI_PSPB_NotificationSender.sendNotifications(enrolleeSendQsqIds, notificationType, new List<String>{''});
        }
    }
}