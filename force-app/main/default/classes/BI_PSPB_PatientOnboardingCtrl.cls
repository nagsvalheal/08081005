/*
@description This class facilitates the creation of patient community users.
It ensures that patient users are created for person account types and associates them with the patient profiles.
This apex is invoked in the flow .
History:
Version    Author               Date              Detail         Description
1.0        Divya Bharathi S     6-Dec-2023        Created        Initial development
1.1        Divya Bharathi S     08-Apr-2024       Updated        Add null check
1.2        Divya Bharathi S     17-Apr-2024       Updated        Add log
*/
public with sharing class BI_PSPB_PatientOnboardingCtrl {
// Define the label for the profile
private static String patientProfile = System.Label.BI_PSP_PatientProfile;
private static String errorMsg = '';
private static BI_SFCOE_LOG_App_Settings__c settings = BI_SFCOE_LOG_App_Settings__c.getValues(
'PSPB'
);
private static string applicationName = settings != null
? settings.BI_SFCOE_LOG_Application__c
: '';
private static List<Account> listAcc = new List<Account>();
private static string emailEncode = System.Label.BI_PSPB_EmailEncodingKey;
private static string locales = System.Label.BI_PSPB_LocaleSidKey;
private static string language = System.Label.BI_PSPB_LanguageLocaleKey;
private static string timeZone = System.Label.BI_PSPB_TimeZoneSidKey;
private static string nullMesaage = System.label.BI_PSPB_PatientNullError;
private static string insertError = System.label.BI_PSPB_InsertError;
private static List<User> lstUsers = new List<User>();    
/*
Description: Creates a user record and updates onboarding.
@param lstAccId: List of Account Ids for which users need to be created
*/
@InvocableMethod(label='Create User' description='Creates a user record')
public static List<User> createUser(List<Id> lstAccId) {
/*On invoking the if condition inside try / catch, it impacted
  the functionality. Hence, it's called outside and checked for null.*/
if (lstAccId.isEmpty()) {
  BI_SFCOE_LOG_Util.logMessage(
  applicationName,
  BI_PSPB_PatientOnboardingCtrl.class.toString(),
  '',
  System.now(),
  nullMesaage,
  BI_SFCOE_LOG_Util.LOG_SEVERITY_ERROR
  );
} else {
  try {
  List<Account> listAcc = [
    SELECT Id, PersonEmail, FirstName, LastName, PersonContactId
    FROM Account
    WHERE Id IN :lstAccId
    WITH USER_MODE
  ];

  Profile portalProfile = [
    SELECT Id
    FROM Profile
    WHERE Name = :patientProfile
    WITH USER_MODE
    LIMIT 1
  ];
  if (portalProfile != null && !listAcc.isEmpty()) {
    for (Account acc : listAcc) {
         String nickNameEmail = acc.PersonEmail.length() > 40 ? acc.PersonEmail.substring(0, 40) : acc.PersonEmail;
    User newUser = new User();
    newUser.UserName = acc.PersonEmail;
    newUser.FirstName = acc.FirstName;
    newUser.LastName = acc.LastName;
    newUser.Alias = acc.FirstName.substring(0, 3);  // Use substring to get first 3 characters
    newUser.Email = acc.PersonEmail;
    newUser.ContactId = acc.PersonContactId;
    newUser.ProfileId = portalProfile.Id;
    newUser.EmailEncodingKey = emailEncode;
    // Concatenate first name and last name for CommunityNickname
    newUser.CommunityNickname = nickNameEmail;
    newUser.TimeZoneSidKey = timeZone;
    newUser.LocaleSidKey = locales;
    newUser.LanguageLocaleKey = language;
    lstUsers.add(newUser);
    }
  } else {
    BI_SFCOE_LOG_Util.logMessage(
    applicationName,
    BI_PSPB_PatientOnboardingCtrl.class.toString(),
    '',
    System.now(),
    insertError,
    BI_SFCOE_LOG_Util.LOG_SEVERITY_ERROR
    );
  } //End if(portalProfile != null && !listAcc.isEmpty())
  if (!lstUsers.isEmpty()) {
    List<Database.SaveResult> saveResults = Database.insert(
    lstUsers,
    false,
    AccessLevel.USER_MODE
    );
    for (Database.SaveResult result : saveResults) {
    if (!result.isSuccess()) {
      for (Database.Error error : result.getErrors()) {
      errorMsg +=
        'Error ' +
        error.getFields() +
        '--' +
        error.getMessage() +
        '\n';
      }
    }
    }
    if (String.isNotBlank(errorMsg)) {
    BI_SFCOE_LOG_Util.handleDatabaseSaveResults(
      saveResults,
      BI_PSPB_PatientOnboardingCtrl.class.toString(),
      System.now()
    );
    }
  } else {
    BI_SFCOE_LOG_Util.logMessage(
    applicationName,
    BI_PSPB_PatientOnboardingCtrl.class.toString(),
    '',
    System.now(),
    insertError,
    BI_SFCOE_LOG_Util.LOG_SEVERITY_ERROR
    );
  }
  } catch (Exception ex) {
  BI_SFCOE_LOG_Util.handleException(
    ex,
    applicationName,
    BI_PSPB_PatientOnboardingCtrl.class.toString(),
    null,
    System.now()
  );
  }
} //End if(lstAccId)
    return lstUsers;// Null check handled in flow
}
}