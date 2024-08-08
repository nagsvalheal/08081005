// This Lightning Web Component is a template with tab navigation for Challenges and Trophy Case, along with sections for Avatar Navigation and Challenge Component.
//To import Libraries
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//To get Current UserId
import Id from '@salesforce/user/Id';
//To import custom labels
import BRANDED_URL from '@salesforce/label/c.BI_PSPB_SiteLabel';
import UNASSIGNED_URL from '@salesforce/label/c.BI_PSPB_UnAssignedLabel';
import URL_SLASH from '@salesforce/label/c.BI_PSP_ChatterSlash';
import SITE_SLASH from '@salesforce/label/c.BI_PSP_SlashSiteUrl';
import BR_CHALLENGES_SITE_URL from '@salesforce/label/c.BI_PSP_ChallengesNaviUrl';
import BR_TROPHY_CASE_SITE_URL from '@salesforce/label/c.BI_PSP_TrophyPageUrl';

export default class BiPspbChallengesParent extends LightningElement {
  //Proper naming conventions with camel case for all the variable will be followed in the future releases
  @track currentXPvalue;
  userId = Id;
  urlq;
  slashUrl = URL_SLASH;
  slashSite = SITE_SLASH;
  siteChallengesUrlBranded = BR_CHALLENGES_SITE_URL;
  siteTrophyCaseUrlBranded = BR_TROPHY_CASE_SITE_URL;

  // To identify the site url
  renderedCallback() {
    let globalThis = window;
    try {
      const currentURL = window.location.href;
      const urlObject = new URL(currentURL); // Create a URL object // Get the path
      const path = urlObject.pathname; // Get the path
      const pathComponents = path.split('/'); // Split the path using '/' as a separator
      const desiredComponent = pathComponents.find((component) =>
        [BRANDED_URL.toLowerCase(), UNASSIGNED_URL.toLowerCase()].includes(
          component.toLowerCase()
        )
      ); // Find the component you need (in this case, 'Branded')

      if (desiredComponent.toLowerCase() === BRANDED_URL.toLowerCase()) {
        this.urlq = BRANDED_URL;
      } else {
        this.urlq = UNASSIGNED_URL;
      }
    
    } catch (error) {
     globalThis.sessionStorage.setItem('errorMessage', error.body.message);
					globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
    }
  }

  // This is used for send the Xp value to child Avatar Component
  sendxpvalue(event) {
    this.currentXPvalue = event.detail;
  }

  // This is used for navigate to specific url to the Challenges Page
  openChallenges() {
    window.location.assign(
      this.slashUrl + this.urlq + this.slashSite + this.siteChallengesUrlBranded
    );
  }

  // This is used for navigate to specific url to the Trophy Page
  openTrophyCase() {
    window.location.assign(
      this.slashUrl + this.urlq + this.slashSite + this.siteTrophyCaseUrlBranded
    );
  }
  // showToast used for all the error messages caught
  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }
}