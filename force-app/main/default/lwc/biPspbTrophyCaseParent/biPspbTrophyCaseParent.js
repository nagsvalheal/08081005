//This is consolidated component for trophy case page,which have a trophy coponent as a child and Avatar navigation as a child
//To import libraries
import { LightningElement } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
//To import custom labels
import BRANDED_URL from '@salesforce/label/c.BI_PSPB_SiteLabel';
import UNASSIGNED_URL from '@salesforce/label/c.BI_PSPB_UnAssignedLabel';
import ERROR_MESSAGE from "@salesforce/label/c.BI_PSP_ConsoleError";
import ERROR_VARIANT from "@salesforce/label/c.BI_PSP_ErrorVariantToast";
import URL_SLASH from "@salesforce/label/c.BI_PSP_ChatterSlash";
import SITE_SLASH from "@salesforce/label/c.BI_PSP_SlashSiteUrl";
import CHALLENGES_SITE_URL from "@salesforce/label/c.BI_PSP_ChallengesNaviUrl";
import TROPHYCASE_SITE_URL from "@salesforce/label/c.BI_PSP_TrophyPageUrl";

export default class BiPspbTrophyCaseParent extends LightningElement {
	//Declare the variables
	urlq;
	slashUrl = URL_SLASH;
	slashSite = SITE_SLASH;
	siteChallengesUrlBranded = CHALLENGES_SITE_URL;
	siteTrophyCaseUrlBranded = TROPHYCASE_SITE_URL;

	//Used to get the current url and to process the url to fetch the site name accordingly
	renderedCallback() {
		let globalThis = window;
		try {
			const CURRENT_URL = window.location.href;
			const URL_OBJECT = new URL(CURRENT_URL); // Create a URL object
			const PATH = URL_OBJECT.pathname; // Get the path1
			const PATH_COMPONENTS = PATH.split('/'); // Split the path1 using '/' as a separator
			const DESIRED_COMPONENT = PATH_COMPONENTS.find(component =>
				[BRANDED_URL.toLowerCase(), UNASSIGNED_URL.toLowerCase()].includes(component.toLowerCase())
			);  // Find the component you need (in this case, 'Branded')

			if (DESIRED_COMPONENT.toLowerCase() === BRANDED_URL.toLowerCase()) {
				this.urlq = BRANDED_URL;
			}
			else {
				this.urlq = UNASSIGNED_URL;
			}
		}
		catch (error) {
			globalThis.sessionStorage.setItem('errorMessage', error.body.message);
			globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
		}
	}
	//this event is used for navigation to challenges page
	openChallenges() {
		window.location.assign(this.slashUrl + this.urlq + this.slashSite + this.siteChallengesUrlBranded);
	}
	//this event is used for navigation to Trophy page
	openTrophyCase() {
		window.location.assign(this.slashUrl + this.urlq + this.slashSite + this.siteTrophyCaseUrlBranded);
	}
	// showToast used for all the error messages caught
	showToast(title, message, variant) {
		const EVENT = new ShowToastEvent({
			title: title,
			message: message,
			variant: variant
		});
		this.dispatchEvent(EVENT);
	}
}