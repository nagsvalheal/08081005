// This lightning web component is used for display the acute patient customized video
// To import Libraries
import { LightningElement,wire,api } from 'lwc';
// To import Apex classes
import GET_RECORDS from '@salesforce/apex/BI_PSPB_TreatmentVideoCtrl.getRecords';
// To import Custom Labels
import FLARE_TREATMENT_HEADING from '@salesforce/label/c.BI_PSPB_FlareTreatmentHeading';
import TRANSCRIPT from '@salesforce/label/c.BI_PSP_Transcript';
import DISCLAIMER from '@salesforce/label/c.BI_PSP_Disclaimer';
import DISCLAIMERMESSAGE from '@salesforce/label/c.BI_PSPB_DisclaimerMessage';
import ERROR_PAGE from '@salesforce/label/c.BI_PSP_DisplayErrorPage';

// To get Current UserId
import ID from '@salesforce/user/Id';

export default class BiPspbAcuteVideo extends LightningElement {
	videoUrl = '';
	isContentVisible = false;
	videoWidth='';
	videoHeight;
	userId = ID;
	flareTreatmentHeading=FLARE_TREATMENT_HEADING;
	transcript = TRANSCRIPT;
	disclaimer = DISCLAIMER;
	disclaimerMessage = DISCLAIMERMESSAGE;
	@api siteUrlq;
	

	// To retrieve the video Url
	@wire(GET_RECORDS)
	wiredMetadata({ data, error }) {
		try {
			if (data && data.length !== 0) {
				this.videoUrl = data[0].BI_PSPB_URL__c;
			} else if(error){
				this.navigateToErrorPage(error.body.message); 
			}
		} catch (err) {
			this.navigateToErrorPage(error.message); // Catching Potential Error from Lwc
		}
	}

	// Getter method to determine the icon name based on content visibility
	get iconName() {
		return this.isContentVisible ? 'utility:chevronup' : 'utility:chevrondown';
	}

	// Getter method to determine the icon alt text based on content visibility
	get iconAltText() {
		return this.isContentVisible ? 'Collapse Content' : 'Expand Content';
	}

	// Getter method to determine the content class based on content visibility
	get contentClass() {
		return this.isContentVisible ? 'content visible' : 'content';
	}

	// Method to toggle the content visibility
	toggleContent() {
		this.isContentVisible = !this.isContentVisible;
	}

	connectedCallback() {
			const globalThis = window;
			// video width and height hardcoded because the UI is not align with the video player
			if(globalThis.innerWidth<=1280){
				this.videoWidth= '700';
				this.videoHeight = '511';
			}
			else{
				this.videoWidth = 'auto';
				this.videoHeight = 'auto';
			}
	}

	// navigateToErrorPage used for all the error messages caught
	navigateToErrorPage(errorMessage) {
		let globalThis = window;
		globalThis.sessionStorage.setItem('errorMessage', errorMessage);
		globalThis.location.assign(this.siteUrlq + ERROR_PAGE);	
	}
}