public with sharing class BI_PSPB_SymptomTrackerFetcher {
	/**
	 * @description  Retrieves treatment reminders based on the given criteria.
	 * @param enrolleeIds The ID of the record related to the treatment reminders.
	 * @return A list of BI_PSP_Symptom_Tracker__c objects that match the criteria.
	 */
	public static List<BI_PSP_Symptom_Tracker__c> fetchSymptomTrackers(
		List<SObject> enrolleeIds
	) {
		Map<Id, BI_PSP_Symptom_Tracker__c> latestSymptomMap = new Map<Id, BI_PSP_Symptom_Tracker__c>();
		try {
			DateTime sevenDaysAgoDateTime = System.now().addDays(-7);
			String sevenDaysAgoStr = sevenDaysAgoDateTime.format('yyyy-MM-dd');

			// Extract IDs from the List<SObject>
			List<Id> enrolleeIdsList = new List<Id>();
			for (SObject obj : enrolleeIds) {
				if (obj.Id != null) {
					enrolleeIdsList.add(obj.Id);
				}
			}

			if (enrolleeIdsList.isEmpty()) {
				return new List<BI_PSP_Symptom_Tracker__c>();
			}

			// Create the query condition string
			String conditionIds =
				'(\'' +
				String.join(enrolleeIdsList, '\', \'') +
				'\')'; // Format for SOQL
			String fields = 'Id, BI_PSP_Care_Program_Enrollee__c, BI_PSP_Care_Program_Enrollee__r.AccountId, BI_PSP_Are_you_currently_experiencing__c, BI_PSP_EditEntrydates__c, CreatedDate, BI_PSP_First_Symptom_Notification_Date__c, BI_PSP_Notification_Status__c';
			String conditions =
				'BI_PSP_Care_Program_Enrollee__c IN ' +
				conditionIds +
				' ' +
				'AND BI_PSP_First_Symptom_Notification_Date__c >= ' +
				sevenDaysAgoStr +
				' ' +
				'AND BI_PSP_Are_you_currently_experiencing__c = TRUE ' +
				'AND BI_PSP_Notification_Status__c = TRUE';
			List<BI_PSP_Symptom_Tracker__c> symptomTrackers = BI_PSP_CommonQueryUtility.executeQuery(
				'BI_PSP_Symptom_Tracker__c',
				fields,
				conditions,
				false
			);

			for (BI_PSP_Symptom_Tracker__c symptom : symptomTrackers) {
				latestSymptomMap.put(
					symptom.BI_PSP_Care_Program_Enrollee__c,
					symptom
				);
			}
		} catch (Exception ex) {
			BI_PSP_LogMessagesUtility.exceptionLogMessage(
				'',
				BI_PSPB_SymptomTrackerFetcher.class.toString(),
				ex
			);
		}
		return new List<BI_PSP_Symptom_Tracker__c>(latestSymptomMap.values());
	}
}