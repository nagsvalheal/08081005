//This lightning web component consolidates for thankyou message summary page
//importing the Libraries
import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
// Imports resourceUrl to reference external resources for proper rendering and functionality.

// Importing Apex classes to interact with Salesforce backend for data retrieval.
import LEAD from "@salesforce/apex/BI_PSPB_ThankyouPageUtilites.getExistingLeads";
import CAREGIVER from "@salesforce/apex/BI_PSPB_ThankyouPageUtilites.getLeadCaregiver";
import PRES_INFO from "@salesforce/apex/BI_PSPB_ThankyouPageUtilites.getLeadPrescription";
import THANKS from "@salesforce/apex/BI_PSPB_ThankyouPageUtilites.checkCaregiverData";

// Imports showToastEvent to display notification messages, informing users about component actions or events.
import { resource } from "c/biPspbEnrollmentFormResource";

export default class BiPspbThankyouForHcpEnrollment extends LightningElement {
	//Proper naming conventions with camel case for all the variable will be followed in the future releases
	// Declaration of variables with
	thanks = resource.THANKS_ENROLL;
	yourPatient = resource.YOUR_PATIENT;
	enrollHead = resource.ENROLL_SUMMARY;
	nameColan = resource.NAME_COLAN;
	dobColan = resource.DOB_COLAN;
	emailColan = resource.EMAIL_COLAN;
	phoneColan = resource.PHONE_COLAN;
	prescriptionInfo = resource.PRESCRIPTION_INFO;
	productColan = resource.PRODUCT_COLAN;
	productCodeColan = resource.PRODUCT_CODE_COLAN;
	prescriptedColan = resource.PRESCRIPTED_COLAN;
	dosageColan = resource.DOSAGE_COLAN;
	frequencyColan = resource.FREQUENCY_COLAN;
	refilsColan = resource.REFILS_COLAN;
	quentityColan = resource.QUANTITY_COLAN;
	relationColan = resource.RELATION_COLAN;
	patientinfo = resource.PATIENT_INFO;
	caregiverInfo = resource.CAREGIVER_INFO;
	errorPage = resource.ERROR_PAGE;
	age = false;
	recordDetails;
	caregiver;
	presInfo;
	result;
	recordId;
	count;
	email;
	messageContent;
	messageContentTwo;
	contData;
	// Declaration of variables
	BGpp = resource.BGPP;
	mailImg = resource.IMG;

	//To fetch the Patient details
	//There's no need to check for null because in Apex, we're throwing an AuraHandledException.
	//Therefore, null data won't be encountered.
	@wire(LEAD, { createLeadId: "$recordId" })
	wiredRecordDetailsLead({ error, data }) {
		let globalThis = window;
		try {
			if (data) {
				this.recordDetails = data;
				this.email = data[0].Email;
			} else if (error) {
				globalThis.sessionStorage.setItem("errorMessage", error.body.message);
				globalThis.location?.assign(
					this.baseUrl + resource.BRANDED_URL + this.errorPage
				);
			}
		} catch (ex) {
			globalThis.sessionStorage.setItem(
				"errorMessage",
				error ? error.body.message : ex.message
			);
			globalThis.location?.assign(
				this.baseUrl + resource.BRANDED_URL + this.errorPage
			);
		}
	}

	//To fetch the Caregiver details
	//There's no need to check for null because in Apex, we're throwing an AuraHandledException.
	//Therefore, null data won't be encountered.
	@wire(CAREGIVER, { caregiverCreateId: "$recordId" })
	wiredRecordDetailsCaregiver({ error, data }) {
		let globalThis = window;
		try {
			if (data && data.length > 0) {
				this.caregiver = data;
				this.age = true;
			} else if (error && data.length > 0) {
				globalThis.sessionStorage.setItem("errorMessage", error.body.message);
				globalThis.location?.assign(
					this.baseUrl + resource.BRANDED_URL + this.errorPage
				);
			}
		} catch (err) {
			globalThis.sessionStorage.setItem("errorMessage", error.body.message);
			globalThis.location?.assign(
				this.baseUrl + resource.BRANDED_URL + this.errorPage
			);
		}
	}

	//To fetch the Prescription details
	//There's no need to check for null because in Apex, we're throwing an AuraHandledException.
	//Therefore, null data won't be encountered.
	@wire(PRES_INFO, { prescriptionCreateId: "$recordId" })
	wiredRecordDetailsPresinfo({ error, data }) {
		let globalThis = window;
		try {
			if (data) {
				this.presInfo = data;
			} else if (error) {
				globalThis.sessionStorage.setItem("errorMessage", error.body.message);
				globalThis.location?.assign(
					this.baseUrl + resource.BRANDED_URL + this.errorPage
				);
			}
		} catch (err) {
			globalThis.sessionStorage.setItem("errorMessage", error.body.message);
			globalThis.location?.assign(
				this.baseUrl + resource.BRANDED_URL + this.errorPage
			);
		}
	}

	//To fetch the caregiver details
	//There's no need to check for null because in Apex, we're throwing an AuraHandledException.
	//Therefore, null data won't be encountered.
	@wire(THANKS, { caregiverCreateId: "$recordId" })
	wiredRecordDetailcontact({ error, data }) {
		let globalThis = window;
		try {
			if (data && data.length > 0) {
				this.contData = data;
				if (this.contData === true) {
					this.messageContent = resource.THANKYOU_MSG_ONE + this.email;
					this.messageContentTwo = resource.THANKYOU_MSG_TWO;
				} else {
					this.messageContent = resource.THANKYOU_MSG_THREE;
					this.messageContentTwo = resource.THANKYOU_MSG_FOUR + this.email;
				}
			} else if (error && data.length > 0) {
				globalThis.sessionStorage.setItem("errorMessage", error.body.message);
				globalThis.location?.assign(
					this.baseUrl + resource.BRANDED_URL + this.errorPage
				);
			}
		} catch (err) {
			globalThis.sessionStorage.setItem("errorMessage", error.body.message);
			globalThis.location?.assign(
				this.baseUrl + resource.BRANDED_URL + this.errorPage
			);
		}
	}
	connectedCallback() {
		let globalThis = window;
		try {
			// Retrieve the recordId from localStorage
			this.recordId = globalThis?.localStorage.getItem("recordId");

			this.count = globalThis?.localStorage.getItem("count");

			if (this.count !== 2) {
				globalThis?.localStorage.setItem("count", 2);
			} else {
				globalThis?.localStorage.setItem("count", 1);
			}
		} catch (error) {
			globalThis.sessionStorage.setItem("errorMessage", error.body.message);
			globalThis.location?.assign(
				this.baseUrl + resource.BRANDED_URL + this.errorPage
			);
		}
	}
	HandleToast(error) {
		this.showToast(
			resource.ERROR_MESSAGE,
			error.body.message,
			resource.ERROR_VARIANT
		);
	}
	//This ShowToast Message is used For Error
	showToast(title, message, variant) {
		if (typeof window !== resource.UNDIFINED) {
			const event = new ShowToastEvent({
				title: title,
				message: message,
				variant: variant
			});
			this.dispatchEvent(event);
		}
	}
}