//This components using  Main component connect all child components user date and recntactivty gpp symptoms
// To import Libraries
import {
	LightningElement,
	track,
	api,
	wire
}
from "lwc";
import {
	loadStyle
}
from "lightning/platformResourceLoader";
import {
	NavigationMixin
}
from "lightning/navigation";
// To import Apex Classes
import GET_ALLERGYINTOLERANCE_DATA from "@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getAllergyIntoleranceData";
import RECORD_INSERT_STS from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.insertSymptomTracker";
import RECORD_INSERTST_UPDATE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.updateSymptomTracker";
import CHECK_UNIQUE_DATE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.checkUniqueDate";
import UPDATE_GPP_VALUE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.updateGppValue";
import UPDATE_RECENT_VALUE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.updateRecentSymptomActivity";
import CREATE_CONTENT_DOCUMENT_LINKS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.createContentDocumentLinks";
import GET_LAST from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.getLastCareTemplate";
import GET_SYMPTOM_RECORD_DATA from "@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getSymptomRecordData";
import GET_CASE_IMAGE_URL from "@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getBase64Image";
import DELETE_CONTENT_DOCUMENT_LINKS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.deleteContentDocumentLinks";
import FETCH_ACCOUNT_DETAILS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.fetchAccountDetails";
import SAVE_FILES from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.saveFiles";
import GET_ENROLLE from "@salesforce/apex/BI_PSP_ChallengeEnrolleCtrl.getEnrolle";
import GET_SYMPTOM_TRACKER_DETAILS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.getSymptomTrackerDetails";
// To import Custom labels and static resources
import * as label from 'c/biPspbLabelAndResourceSymptom';
export default class BiPspbSymptomTracker extends NavigationMixin(LightningElement) {
	//@api variable declaration
	@api symptomrecord1;
	@api symptomTrackerId;
	@track imageUrls = [];
	@api recordId;
	//variable declaration
	symptomCompleteTick = label.SYMPTOM_TICK_IMG;
	itchinessColorVarient = label.ITCHINESS_COLOR_VARIENT;
	rednessColorVarient = label.REDNESS_COLOR_VARIENT;
	painColorVarient = label.PAIN_COLOR_VARIENT;
	pustulesColorVarient = label.PUSTULES_COLOR_VARIENT;
	fatigueColorVarient = label.FATIGUE_COLOR_VARIENT;
	moodColorVarient = label.MOOD_COLOR_VARIENT;
	temperatureColorVarient = label.TEMPERATURE_COLOR_VARIENT;
	symptomTickIcon = label.SYMPTOM_TICK_ICON;
	addSymptom = label.ADD_SYMPTOM;
	enterDate = label.ENTER_DATE;
	saveDate = label.SAVE_DATE;
	alreadyExist = label.SYMPTOM_ALREADY_EXIST;
	futureDate = label.SYMPTOM_FUTURE_DATE;
	lastModified = label.LAST_MODIFIED;
	experiencingGpp = label.EXPERIENCING_GPP_NOW;
	confirmAndSave = label.CONFIRM_SAVE;
	speakToDoctor = label.SPOKEN_GPP;
	selectSymptomsYouExperiencing = label.SELECT_BODY_SYMPTOM;
	activityLabel = label.SYMPTOM_ACTIVITY;
	selectCausesSymptom = label.CAUSE_SYMPTOM;
	steroidWithdrawal = label.STEROID_WITHDRAWAL;
	hadInfection = label.HAD_INFECTION;
	stressLabel = label.STRESS_LABEL;
	confirmPregnant = label.CONFIRMED_PREGNENT;
	stopSteroids = label.STARTING_STEROID;
	extremeClimate = label.EXTREME_WEATHER;
	newOintment = label.NEW_OINTMENT;
	excessiveSunExposure = label.SUN_EXPOSURE;
	addSkinPhoto = label.SYMPTOM_PHOTO;
	limitReached = label.LIMITED_REACHED;
	lastModifiedDate;
	maxFiveImage = label.MAXIMUM_IMAGE;
	maxLimit = label.MAXIMUM_LIMIT;
	addYourPhoto = label.ADD_YOUR_PHOTO;
	fileTooLarge = label.FILE_SIZE;
	photoOfFlares = label.PHOTO_FLARES;
	hereSomeAdvice = label.HERE_SOME_ADVICE;
	photoHostedRegion = label.SYMPTOM_PHOTO_ADVICE;
	takingPictures = label.TAKING_PICTURES;
	tipsToPerfectPhoto = label.TIPS_PERFECT_PHOTO;
	trySelfieMode = label.NO_SELFIE_MODE;
	lowerQuality = label.QUALITY_LOW;
	avoidZoom = label.ZOOM_AMOUNT;
	fastShutterSpeed = label.SET_SHUTTER_SPEED;
	goodLight = label.GOOD_LIGHTNING;
	closeLabel = label.CLOSE_LABEL;
	submitEntry = label.SUBMIT_ENTRY;
	addAtLeastOneSymptom = label.ADD_ONE_SYMPTOM;
	iUnderstandInformationCorrect = label.UNDERSTAND_PROVIDED_INFO;
	understandLabel = label.I_UNDERSTAND;
	itchinessLabel = label.ITCHINESS_VALUES;
	rednessLabel = label.REDNESS_VALUE;
	temperatureLabel = label.TEMPERATURE_VALUES;
	pustulesLabel = label.PUSTULES_VALUE;
	painLabel = label.PAIN_VALUES;
	fatigueLabel = label.FATIGUE_VALUES;
	moodLabel = label.MOOD_IMG;
	symptomLabel = label.SYMPTOMS_LABEL;
	photosLabel = label.PHOTOS_LABEL;
	confirmSubmit = label.CONFIRM_SUBMISSION;
	lasteDatedIsPlay = false;
	isDeskTop = false;
	rednessChange = false;
	painChange = false;
	pustlesChange = false;
	fatiquesChange = false;
	moodChange = false;
	temperatureChange = false;
	sliderValue = 8;
	whichValuesOne = "Which of the below apply to your recent";
	boxedIcon = label.BOXED_ICON;
	limtUpLoad = label.UPLOAD_IMG;
	accName;
	isPopupOpenUndersatand = false;
	isPopupOpenDisable = true;
	lastModifi = false;
	entryDate;
	chsngedVal;
	isDateUnique = false;
	isGppExperiencing;
	lastEntryDate;
	accDate;
	gpp;
	editEntryDate = [];
	accGender = false;
	accGenderCheck;
	isDropDownVisible = false;
	isDropDownSymptom = false;
	isDropDownRecent = false;
	bodyParts = [];
	inputFieldValue = "";
	inputFieldColor = "";
	changeValue = "";
	storedData = "";
	isDropDownOpen = false;
	isPopUpOpen = false;
	isDropDownOpen1 = false;
	isPopUpOpen1 = false;
	isDropDownOpen2 = false;
	isPopUpOpen2 = false;
	isDropDownOpen3 = false;
	isPopUpOpen3 = false;
	isDropDownOpen4 = false;
	isPopUpOpen4 = false;
	isDrop = false;
	result = "";
	currentDate;
	currentDate2;
	isFutureDateError = false;
	selectedValue;
	isDrop2 = false;
	colorChange = "";
	colorChange1 = "";
	colorChange2 = "";
	colorChange3 = "";
	colorChange4 = "";
	colorChange5 = "";
	colorChange6 = "";
	itchinessChange1 = false;
	formattedLastModifiedDate;
	lastModifiedTime;
	accordColor;
	accordColorSymptom;
	itchinessChange = false;
	primaryPage;
	extraImg;
	submitModal = false;
	undersatand = false;
	showFiles = false;
	selectedLabels = [];
	dataLabel;
	recntBtn = []; // Initialize recntBtn as an empty array
	btnColorChange = "dropdown3-activity-btn";
	isButtonDisabled = true;
	accordColorBtn;
	files = [];
	fileIds = [];
	latestImageBase64;
	upLoadedFiles = [];
	isLimitReached = false;
	isLimitReachedUpLoad = true;
	upLoadedLarge = false;
	attachmentIdsValues;
	fileChangeColour;
	fileWork = false;
	fileMessage = false;
	isEditMode = false;
	resultId;
	dataMandatory = false;
	dataMantroyDispable = true;
	currentlyGpp = false;
	changerAdioBtn;
	changerAdioBtn1;
	formattedSymptomData;
	symptomData;
	symptomGpp;
	showMessage = false;
	options1 = [];
	recentActivity = false;
	dateDisable = false;
	firstTime = false;
	recentImages = false;
	allergyIntoleranceData;
	itchBody;
	intensity;
	carePlanTemplateNam;
	whichSymptom;
	fileTitle = label.UPLOADED_FILE;
	filePath = label.UPLOADED_FILE_PNG;
	calendericon = label.CALENDER;
	Editdatedisable = false;
	oldimageurl = [];
	totalSize = [];
	vari;
	dynamicValue = label.DYNAMIC_VALUE;
	userId = label.ID;
	selectedOption = [];
	accountId;
	personGendercheck;
	fileData;
	lastsymptomid;
	receivedValue;
	gppvaluesradio;
	image;
	image1;
	image2;
	image3;
	image4;
	image5;
	image6;
	userIddata;
	MAX_FILE_COUNT = 5;
	imageUrl;
	acceptedFormats = ".png, .jpg";
	showItchinessModal = false;
	showPainModal = false;
	showMoodModal = false;
	showFatigueModal = false;
	showTemperatureModal = false;
	showrednessModal = false;
	showPustulesModal = false;
	// lAST MODIFIED START
	//Wire method to call the fetchAccountDetails Apex method
	@wire(FETCH_ACCOUNT_DETAILS, {
		careProgramEnrolleeId: "$accountId"
	})
	wiredAccountDetails({
		error: accError,
		data
	}) {
		try {
			if (data && data.length > 0) {
				const enrollee = data[0];
				const personGenderIdentity = enrollee.Account.HealthCloudGA__Gender__pc;
				// Assign values to component properties if needed
				this.accGenderCheck = personGenderIdentity;
				this.accGender = this.accGenderCheck === label.FEMALE;
			}
			else if (accError) {
				this.handleError(accError.body.message);
			}
		}
		catch (error) {
			this.handleError(error.body.message);
		}
	}
	@wire(GET_LAST)
	wiredLastEntryDate({
		error,
		data
	}) {
		try {
			if (data) {
				this.updateSymptomImages(data);
				this.formatImageContents();
			}
			else if (error) {
				this.handleError(error.body.message);
			}
		}
		catch (errors) {
			this.handleError(errors.body.message);
		}
	}
	@wire(GET_SYMPTOM_RECORD_DATA, {
		symptomTrackerId: "$lastsymptomid"
	})
	wiredGetSymptomRecordData({
		data
	}) {
		try {
			if (data && data !== null) {
				this.processSymptomData(data);
			}
		}
		catch (errors) {
			this.handleError(errors.body.message);
		}
	}
	@wire(GET_CASE_IMAGE_URL, {
		symptomTrackerId: "$lastsymptomid"
	})
	wiredGetCaseImageURL({
		data
	}) {
		try {
			if (data && data !== null) {
				this.processCaseImages(data);
			}
		}
		catch (errors) {
			this.handleError(errors.body.message);
		}
	}
	@wire(GET_ALLERGYINTOLERANCE_DATA, {
		symptomTrackerId: "$lastsymptomid"
	})
	wiredAllergyIntoleranceData({
		errors,
		data
	}) {
		try {
			if (data && data !== null) {
				this.isPopupOpenDisable = false;
				this.whichSymptom = data;
				const symptomMap = {
					[label.ITCHINESS_VALUES]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					},
					[label.REDNESS_VALUE]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					},
					[label.PAIN_VALUES]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					},
					[label.PUSTULES_VALUE]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					},
					[label.FATIGUE_VALUES]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					},
					[label.TEMPERATURE_VALUES]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					},
					[label.MOOD_IMG]: {
						change: true,
						cssClass: "card-header-accord",
						change1: true
					}
				};
				data.forEach(record => {
					const templateName = record?.BI_PSP_Symptoms__r?.HealthCloudGA__CarePlanTemplate__r?.Name;
					if (templateName && symptomMap[templateName]) {
						this.accordColorSymptom = symptomMap[templateName].cssClass;
						this[`${templateName.toLowerCase()}Change`] = symptomMap[templateName].change;
						this.itchinessChange1 = symptomMap[templateName].change1;
					}
				});
			}
			else if (errors) {
				this.handleError(errors.body.message);
			}
		}
		catch (error) {
			this.handleError(error.body.message);
		}
	}
	@wire(GET_SYMPTOM_TRACKER_DETAILS, {
		careProgramEnrolleeId: "$accountId"
	})
	wiredResult({
		data
	}) {
		try {
			if (data) {
				const {
					lastModifiedDate,
					lasttime
				} = data;
				const [datePart, timePart] = lasttime.split(", ");
				const dateTime = new Date(`${datePart} ${timePart}`);
				const formattedTime = dateTime.toTimeString()
					.split(' ')[0]; // HH:mm:ss
				this.lastModifi = true;
				const date = new Date(lastModifiedDate);
				this.formattedLastModifiedDate = `${this.formatDate(date)} at ${formattedTime}`;
			}
		}
		catch (errors) {
			this.handleError(errors.body.message);
		}
	}
	connectedCallback() {
		try {
			this.loadStyles();
			this.handleURLParams();
			this.updateRecentActivity();
			this.setNavigationURL();
			this.retrieveSessionStorageData();
			this.fetchEnrolleeData();
			this.setDateProperties();
		}
		catch (error) {
			this.handleError(error.body?.message || 'An unexpected error occurred.');
		}
	}
	formatDate(date) {
		const options = {
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true
		};
		return date.toLocaleString(label.LABEL_US, options);
	}
	changerecord(event) {
		this.vari = event.detail;
		const symptoms = {
			[label.ITCHINESS_VALUES]: {
				className: "colorChange",
				accordColor: "card-header-accord",
				itchinessChange: true
			},
			[label.REDNESS_VALUE]: {
				className: "colorChange1",
				accordColor: "card-header-accord",
				rednessChange: true
			},
			[label.PAIN_VALUES]: {
				className: "colorChange2",
				accordColor: "card-header-accord",
				painChange: true
			},
			[label.PUSTULES_VALUE]: {
				className: "colorChange3",
				accordColor: "card-header-accord",
				pustlesChange: true
			},
			[label.FATIGUE_VALUES]: {
				className: "colorChange4",
				accordColor: "card-header-accord",
				fatiquesChange: true
			},
			[label.TEMPERATURE_VALUES]: {
				className: "colorChange5",
				accordColor: "card-header-accord",
				temperatureChange: true
			},
			[label.MOOD_IMG]: {
				className: "colorChange6",
				accordColor: "card-header-accord",
				moodChange: true
			}
		};
		this.colorChange = this.colorChange1 = this.colorChange2 = this.colorChange3 = this.colorChange4 = this.colorChange5 = this.colorChange6 = "";
		this.itchinessChange = this.itchinessChange1 = this.rednessChange = this.painChange = this.pustlesChange = this.fatiquesChange = this.temperatureChange = this.moodChange = false;
		this.accordColorSymptom = "";
		const symptom = symptoms[this.vari];
		if (symptom) {
			this.isPopupOpenDisable = false;
			this[symptom.className] = symptom.className;
			this.accordColorSymptom = symptom.accordColor;
			this.itchinessChange = symptom.itchinessChange || this.itchinessChange;
			this.itchinessChange1 = symptom.itchinessChange || this.itchinessChange1;
			this.rednessChange = symptom.rednessChange || this.rednessChange;
			this.painChange = symptom.painChange || this.painChange;
			this.pustlesChange = symptom.pustlesChange || this.pustlesChange;
			this.fatiquesChange = symptom.fatiquesChange || this.fatiquesChange;
			this.temperatureChange = symptom.temperatureChange || this.temperatureChange;
			this.moodChange = symptom.moodChange || this.moodChange;
		}
	}
	renderedCallback() {
		if (this.recntBtn && this.recntBtn.length > 0) {
			this.updateElementStyles(this.recntBtn);
		}
		let globalThis = window;
		globalThis.addEventListener("beforeunload", this.handlePageRefresh);
	}
	updateButtonStyles(items) {
		items.forEach((item) => {
			let clickedElement = this.template.querySelector(`[data-name='${item}']`);
			if (clickedElement) {
				const isNotSelected = clickedElement.style.backgroundColor === "" || clickedElement.style.backgroundColor === "white";
				if (isNotSelected) {
					clickedElement.style.backgroundColor = "#C6AA76";
					clickedElement.style.fontFamily = " 'Eina-SemiBold', 'Helvetica', 'Arial', 'Verdana', 'Tahoma', 'sans-serif'";
				}
				else {
					clickedElement.style.backgroundColor = "white";
				}
			}
		});
	}
	loadStyles() {
		loadStyle(this, label.FILE_UPLOADER_CSS);
		loadStyle(this, label.SYMPTOMS_IMG);
	}
	handleURLParams() {
		let globalThis = window;
		const queryParams = new URLSearchParams(globalThis.location?.search);
		this.receivedValue = queryParams.get("value");
		globalThis.history.replaceState({}, globalThis.document?.title, globalThis.location?.pathname);
		if (this.receivedValue) {
			this.lastModifi = false;
		}
	}
	updateRecentActivity() {
		let globalThis = window;
		//This code retrieves data labeled as 'recentactivity' from the session storage without altering custom labels.
		let recntBtn = globalThis?.sessionStorage.getItem("recentActivity");
		Promise.resolve()
			.then(() => {
				recntBtn?.forEach((item) => {
					let element = this.template.querySelector(`[data-name='${item}']`);
					if (element) {
						element.style.backgroundColor = "#C6AA76";
						element.style.fontFamily = " 'Eina-SemiBold', 'Helvetica', 'Arial', 'Verdana', 'Tahoma', 'sans-serif'";
					}
					this.accordColor = "card-header-accord";
					this.accordColorBtn = "card-header-accord";
					this.recentactivity = true;
				});
			});
	}
	setNavigationURL() {
		let globalThis = window;
		const currentURL = globalThis.location.href;
		// Create a URL object
		const urlObject = new URL(currentURL);
		// Get the path
		const path = urlObject.pathname;
		// Split the path using '/' as a separator
		const pathComponents = path.split("/");
		// Find the component you need (in this case, 'Branded')
		const desiredComponent = pathComponents.find((component) => [label.BRANDED_URL.toLowerCase(), label.UNASSIGNED_URL.toLowerCase()].includes(component.toLowerCase()));
		if (desiredComponent.toLowerCase() === label.BRANDED_URL.toLowerCase()) {
			this.urlq = label.BRANDED_URL_NAVIGATION;
		}
		else {
			this.urlq = label.UNASSIGNED_URL_NAVIGATION;
		}
	}
	retrieveSessionStorageData() {
		let globalThis = window;
		//This code retrieves data labeled as 'stopprcocess' from the session storage without altering custom labels.
		this.primaryPage = globalThis?.localStorage.getItem("stopprcocess");
		if (this.primaryPage === label.DATE_INPUT_PAGE) {
			this.dataMandatory = false;
		}
		//This code retrieves data labeled as 'symptomlastid' from the session storage without altering custom labels.
		this.lastsymptomid = globalThis?.localStorage.getItem("symptomlastid");
		//      //This code retrieves data labeled as 'gppvalues' from the session storage without altering custom labels.
		this.gppvaluesradio = globalThis?.sessionStorage.getItem("gppvalues", this.resultId);
		const localStorageValue = globalThis?.localStorage.getItem("Time", this.resultId);
		this.time = localStorageValue;
	}
	fetchEnrolleeData() {
		GET_ENROLLE({
				userId: this.useId
			})
			// Null data is checked and AuraHandledException is thrown from the Apex
			.then((result) => {
				if (result && result[0].patientEnrolle !== null) {
					this.accountId = result[0].patientEnrolle.Id;
				}
				else if (result[0].error !== null) {
					this.showError = true;
					this.errorMessage = result[0].error;
				}
			})
			.catch((error) => {
				// Handle any errors occurring during the promise chain
				this.handleError(error.body.message);
			});
	}
	setDateProperties() {
		const today = new Date();
		this.currentDate = today.toISOString()
			.slice(0, 10);
		this.maxDate = today.toISOString()
			.slice(0, 10);
	}
	updateSymptomImages(data) {
		data.forEach(careplanimage => {
			switch (careplanimage.Name) {
				case label.ITCHINESS_VALUES:
					this.imageItchiness = careplanimage.BI_PSP_Symptom_image__c;
					break;
				case label.REDNESS_VALUE:
					this.imageRedness = careplanimage.BI_PSP_Symptom_image__c;
					break;
				case label.PAIN_VALUES:
					this.imagePain = careplanimage.BI_PSP_Symptom_image__c;
					break;
				case label.PUSTULES_VALUE:
					this.imagePustules = careplanimage.BI_PSP_Symptom_image__c;
					break;
				case label.FATIGUE_VALUES:
					this.imageFatigue = careplanimage.BI_PSP_Symptom_image__c;
					break;
				case label.TEMPERATURE_VALUES:
					this.imageTemperature = careplanimage.BI_PSP_Symptom_image__c;
					break;
				case label.MOOD_IMG:
					this.imageMood = careplanimage.BI_PSP_Symptom_image__c;
					break;
				default:
					this.imageMood = careplanimage.BI_PSP_Symptom_image__c
					break;
			}
		});
	}
	formatImageContents() {
		const imgTagRegex = /<img\s+[^>]*src='([^']+)'[^>]*>/giu;
		const formatImageContent = image => image.replace(imgTagRegex, src => `<img src='${src}'>`);
		[this.image, this.image1, this.image2, this.image3, this.image4, this.image5, this.image6].forEach((image, index) => {
			this[`image${index}`] = formatImageContent(image);
		});
	}
	processSymptomData(data) {
		this.Editdatedisable = true;
		this.satrdate = false;
		this.symptomData = data[0].BI_PSP_EditEntrydates__c;
		this.symptomGpp = data[0].BI_PSP_Are_you_currently_experiencing__c;
		this.chsngedVal = this.symptomGpp.split(label.GPP)
			.map(val => val.trim());
		this.todaysDate = this.formatDate(new Date());
	}
	processCaseImages(data) {
		this.caseImageDetails = data;
		this.caseImage = data.map(image => image.BI_PSP_Symptom_image__c);
	}
	options = [{
		label: label.YES,
		value: label.YES
	}, {
		label: label.NO,
		value: label.NO
	}];
	// Handle errors and display a toast message
	handleError(error) {
		let globalThis = window;
		globalThis.location.href = label.ERROR_PAGE;
		globalThis.sessionStorage.setItem('errorMessage', error);
	}
	get dropdownStates() {
		return [
			this.isDropDownOpen,
			this.isDropDownOpen1,
			this.isDropDownOpen2,
			this.isDropDownOpen3,
			this.isDropDownOpen4
		];
	}
	getDropdownButtonClass(index) {
			return this.dropdownStates[index] ? "dropdown-arrow-button dropdown-arrow-button-open" : "dropdown-arrow-button";
	}
	get dropdownButtonClass() {
		return this.getDropdownButtonClass(0);
	}
	get dropdownButtonClass1() {
		return this.getDropdownButtonClass(1);
	}
	get dropdownButtonClass2() {
		return this.getDropdownButtonClass(2);
	}
	get dropdownButtonClass3() {
		return this.getDropdownButtonClass(3);
	}
	get dropdownButtonClass4() {
		return this.getDropdownButtonClass(4);
	}
	toggleDropdown() {
		this.isDropDownVisible = !this.isDropDownVisible;
	}
	handleChange(event) {
		this.selectedOption = event.target.value;
	}
	handlePageRefresh(event) {
		let globalThis = window;
		globalThis.sessionStorage?.clear();
		event.returnValue = "";
	}
	handleEditDate() {
		this.isEditMode = true;
	}
	toggleDropdown1() {
		this.isDropDownOpen1 = !this.isDropDownOpen1;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen4 = false;
		this.isDropDownOpen3 = false;
	}
	toggleDropdown2() {
		this.isDropDownOpen2 = !this.isDropDownOpen2;
		this.isDropDownOpen3 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
	}
	toggleDropdown3() {
		this.isDropDownOpen3 = !this.isDropDownOpen3;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
		//The setTimeout with a small delay ensures UI updates occur after the current rendering tasks, preventing glitches.
		if (this.recntBtn && this.recntBtn.length > 0) {
			if (this.recntBtn && this.recntBtn.length > 0) {
				this.updateButtonStyles(this.recntBtn);
			}
		}
	}
	toggleDropdown4() {
		this.isDropDownOpen4 = !this.isDropDownOpen4;
		this.isDropDownOpen3 = false;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
	}
	// Session storage keys
	keys = ["myData", "redness", "Paindata", "Pustule", "mood", "fatigue", "temperature", "gpp"];
	// Handles dropdown change
	handlechnagedropdown() {
		let globalThis = window;
		const values = this.getSessionStorageValues(this.keys.slice(0, 7));
		globalThis?.sessionStorage.setItem("syptombtn", true);
		if (this.areValuesEmpty(values) && this.chsngedVal === this.label.YES) {
			this.opensubmitModal();
		}
		else {
			this.handleDropdownState(this.chsngedVal);
		}
	}
	// Handles button click
	handleButtonClick() {
		let globalThis = window;
		const values = this.getSessionStorageValues(this.keys);
		const symptbtn = globalThis?.sessionStorage.getItem("syptombtn");
		if (this.shouldOpenSubmitModal(values, symptbtn)) {
			this.opensubmitModal();
			this.isPopupOpenDisable = false;
		}
		else {
			this.openundersatand();
			this.isPopupOpenDisable = false;
		}
	}
	// Handles saving GPP value
	handleSavegpp() {
		const values = this.getSessionStorageValues(this.keys.slice(0, 7));
		if (this.chsngedVal === 'Yes') {
			this.opensubmitModal();
		}
		if (this.chsngedVal === 'No') {
			this.isPopupOpenDisable = false;
		}
		if (this.areValuesEmpty(values) && this.chsngedVal === this.label.YES) {
			this.prepareGppUpdate(true);
		}
		else if (this.lastsymptomid || this.chsngedVal === this.label.NO) {
			this.prepareGppUpdate(false);
		}
	}
	// Prepares for updating GPP value
	prepareGppUpdate(gppValue) {
		let globalThis = window;
		this.currentlyGpp = true;
		this.accordColor = "card-header-gpp";
		this.changerAdioBtn = gppValue;
		this.isPopUpOpen = gppValue;
		this.isPopupOpenUndersatand = !gppValue;
		this.isDropDownOpen2 = !gppValue;
		this.isDropDownOpen1 = false;
		UPDATE_GPP_VALUE({
				symptomTrackerId: this.resultId || this.lastsymptomid,
				gpp: this.changerAdioBtn
			})
			.then(result => {
				if (result) {
					this.accordColor = "card-header-gpp";
				}
			})
			.catch(error => {
				this.handleError(error.body.message);
			})
			.finally(() => {
				this.isEditMode = false;
				globalThis?.sessionStorage.setItem("gpp", this.chsngedVal);
			});
	}
	// Utility function to get session storage values for given keys
	getSessionStorageValues(keys) {
		let globalThis = window;
		return keys.map(key => globalThis?.sessionStorage.getItem(key));
	}
	// Utility function to check if all values are empty
	areValuesEmpty(values) {
		return values.every(value => !value);
	}
	// Determines if the submit modal should open based on values and button state
	shouldOpenSubmitModal(values, symptbtn) {
		return this.areValuesEmpty(values.slice(0, 7)) && values[7]?.toLowerCase() === "yes" || (!symptbtn || symptbtn === "false") && values[7]?.toLowerCase() === "yes";
	}
	// Handles dropdown state based on the changed value
	handleDropdownState(chsngedVal) {
		if (chsngedVal === this.label.NO) {
			this.accordColorSymptom = "card-header-accord";
			this.itchinessChange1 = true;
		}
		this.isDropDownOpen3 = !this.isDropDownOpen3;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
	}
	opensubmitModal() {
		this.submitModal = true;
		document.body.style.overflow = "hidden";
	}
	closesubmitModal() {
		this.submitModal = false;
		document.body.style.overflow = ""; // Reset to default
	}
	openundersatand() {
		let globalThis = window;
		this.undersatand = true;
		document.body.style.overflow = "hidden";
		this.submitModal = false;
		globalThis?.localStorage.clear();
	}
	closeundersatand() {
		this.undersatand = false;
		document.body.style.overflow = ""; // Reset to default
	}
	addsymtom() {
		if (!this.isDropDownOpen) {
			this.isDropDownOpen2 = true;
			this.isDropDownOpen1 = false;
			this.submitModal = false;
			document.body.style.overflow = ""; // Reset to default
		}
		else {
			this.isDropDownOpen2 = false;
			this.isPopUpOpen = false;
		}
	}
	understand() {
		let globalThis = window;
		globalThis.location.assign(this.urlq + label.SYMPTOM_GRAPH_PAGE);
		globalThis?.sessionStorage.setItem(label.DYNAMIC_VALUE, 'someDynamicValue')
	}
	openItchinessModal() {
		this.showItchinessModal = true;
		document.body.style.overflow = "hidden";
	}
	closeItchinessModal() {
		this.showItchinessModal = false;
		document.body.style.overflow = ""; // Reset to default
	}
	// PainModal
	openPainModal() {
		this.showPainModal = true;
		document.body.style.overflow = "hidden";
	}
	closePainModal() {
		let globalThis = window;
		this.showPainModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'Paindatavalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("Paindatavalues", 0);
	}
	// RednessModal
	openRednessModal() {
		this.showrednessModal = true;
		document.body.style.overflow = "hidden";
	}
	closeRednessModal() {
		let globalThis = window;
		this.showrednessModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'rednessvalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("rednessvalues", 0);
	}
	// pustel model
	openPustulesModal() {
		this.showPustulesModal = true;
		document.body.style.overflow = "hidden";
	}
	closePustulesModal() {
		let globalThis = window;
		this.showPustulesModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'Pustulevalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("Pustulevalues", 0);
	}
	// Fatigue Modal
	openFatigueModal() {
		this.showFatigueModal = true;
		document.body.style.overflow = "hidden";
	}
	closeFatigueModal() {
		let globalThis = window;
		this.showFatigueModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'fatiguevalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("fatiguevalues", 0);
	}
	// Temperature Modal
	openTemperatureModal() {
		this.showTemperatureModal = true;
		document.body.style.overflow = "hidden";
	}
	closeTemperatureModal() {
		this.showTemperatureModal = false;
		document.body.style.overflow = "";
	}
	// Mood Modal
	openMoodModal() {
		this.showMoodModal = true;
		document.body.style.overflow = "hidden";
	}
	closeMoodModal() {
		this.showMoodModal = false;
		document.body.style.overflow = ""; // Reset to default
	}
	// files upload
	openfiles() {
		this.showFiles = true;
		document.body.style.overflow = "hidden";
	}
	closefiles() {
		this.showFiles = false;
		document.body.style.overflow = ""; // Reset to default
	}
	handleClickactivites(event) {
		const clickedElement = event.target;
		const elementClass = clickedElement.classList.value;
		if (elementClass.includes(this.btnColorChange)) {
			const selectedOption = clickedElement.getAttribute("data-name");
			// Toggle the background color and update the selected values
			// Initialize this.recntBtn as an array if it's not already initialized
			if (!this.recntBtn) {
				this.recntBtn = [];
			}
			if (clickedElement.style.backgroundColor === "" || clickedElement.style.backgroundColor === "white") {
				// If the background color is white, it means it's not selected
				clickedElement.style.backgroundColor = "#C6AA76"; // Set to selected color
				clickedElement.style.fontFamily = " 'Eina-SemiBold', 'Helvetica', 'Arial', 'Verdana', 'Tahoma', 'sans-serif'";
				this.recntBtn.push(selectedOption);
			}
			else {
				// If the background color is not white, it means it's selected
				clickedElement.style.backgroundColor = "white"; // Reset to original color
				this.recntBtn = this.recntBtn.filter(
					(option) => option !== selectedOption); // Remove the selected option from the array
			}
		}
	}
	updatedRecordId;
	handleClickForAccept() {
		let globalThis = window;
		// Close all dropdowns except the fourth one
		this.isDropDownOpen4 = true;
		this.isDropDownOpen3 = false;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		// Store data labeled as 'recentactivity' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("recentActivity", this.recntBtn);
		// Set the class based on the condition whether recntBtn has only one item or not
		this.accordColorBtn = this.recntBtn ? "card-header-accord" : "another-class";
		try {
			this.recentActivity = true;
			if (this.lastsymptomid) {
				this.updatedRecordId = UPDATE_RECENT_VALUE({
					symptomTrackerId: this.lastsymptomid,
					valuesToUpdate: this.recntBtn
				});
				this.recentActivity = true;
			}
			else {
				this.updatedRecordId = UPDATE_RECENT_VALUE({
					symptomTrackerId: this.resultId,
					valuesToUpdate: this.recntBtn
				});
				this.recentActivity = true;
			}
		}
		catch (error) {
			this.handleError(error.body.message);
		}
	}
	handleFileInputChange(event) {
		const files = event.target.files;
		if (!files || files.length === 0) {
			this.resetStatus();
			return;
		}
		if (this.isFileLimitExceeded(files.length)) {
			this.isLimitReached = true;
			return;
		}
		this.processFiles(files);
	}
	isFileLimitExceeded(fileCount) {
		return this.imageUrls.length + fileCount > 4;
	}
	processFiles(files) {
		const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
		Array.from(files)
			.forEach(file => {
				if (this.isValidImageFile(file, maxFileSize)) {
					this.addFile(file, maxFileSize);
				}
				else {
					this.handleInvalidFile(file);
				}
			});
	}
	isValidImageFile(file, maxFileSize) {
		return file.type.includes("image") && file.size <= maxFileSize;
	}
	addFile(file) {
		const reader = new FileReader();
		reader.onload = () => this.handleFileLoad(reader.result);
		reader.readAsDataURL(file);
	}
	handleFileLoad(result) {
		this.imageUrls = [...this.imageUrls, result];
		this.updateTotalSize();
	}
	updateTotalSize() {
		const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
		let sum = 0;
		this.totalSize = this.totalSize.filter(size => {
			sum += size;
			if (sum > maxFileSize) {
				this.upLoadedLarge = true;
				return false;
			}
			return true;
		});
		if (sum > maxFileSize) {
			this.upLoadedLarge = true;
		}
		else {
			this.upLoadedLarge = false;
		}
	}
	handleInvalidFile(file) {
		this.upLoadedLarge = file.size > 5 * 1024 * 1024; // 5MB in bytes
	}
	resetStatus() {
		this.upLoadedLarge = false;
		this.isLimitReached = false;
	}
	// popup end
	openrpopup() {
		this.ispoup = true;
	}
	closrpopup() {
		this.ispoup = false;
	}
	openPopup1() {
		this.isPopUpOpen1 = true;
	}
	closePopup1() {
		this.isPopUpOpen1 = false;
	}
	openPopup() {
		this.isPopUpOpen = true;
	}
	closePopup() {
		this.isPopUpOpen = false;
	}
	// Call this method to trigger the deletion
	async removeImage(event) {
		const index = event.target.dataset.index;
		this.imageUrls.splice(index, 1);
		if (this.imageUrls.length > 4) {
			this.isLimitReached = true;
		}
		else {
			this.isLimitReached = false;
		}
		try {
			await DELETE_CONTENT_DOCUMENT_LINKS({
				symptomTrackerId: this.lastsymptomid
			});
		}
		catch (error) {
			// Handle synchronous error if needed
			this.handleError(error.body.message);
		}
	}
	async handleSaveDate() {
		let globalThis = window;
		let accForInsert = this.accountId;
		let myBoolean = false;
		// Ensure isDateUnique is resolved before proceeding
		this.checkDateUniqueness();
		if (this.isDateUnique === false) {
			if (!this.lastsymptomid) {
				this.resultId = await RECORD_INSERT_STS({
					accId: accForInsert,
					editEntryDate: this.currentDate2
				});
			}
			else {
				this.resultId = await RECORD_INSERTST_UPDATE({
					symptomTrackerId: this.lastsymptomid,
					gpp: myBoolean,
					editEntryDate: this.currentDate2
				});
			}
			if (this.resultId) {
				// Store data labeled as 'Time' in the session storage without altering custom labels.
				globalThis?.localStorage.setItem("Time", this.resultId);
				// Store data labeled as 'gppvalues' in the session storage without altering custom labels.
				globalThis?.sessionStorage.setItem("gppvalues", this.resultId);
				this.dataMandatory = true;
				this.dataMantroyDispable = true;
				this.Editdatedisable = true;
			}
		}
	}
	checkDateUniqueness() {
		if (this.currentDate) {
			CHECK_UNIQUE_DATE({
					editedDate: this.currentDate,
					accountId: this.accountId
				})
				.then(result => {
					this.result = result;
					if (this.result) {
						this.isDateUnique = false;
					}
					else {
						this.isDateUnique = true;
						this.dataMantroyDispable = true;
					}
				})
				.catch(error => {
					this.handleError(error.body.message);
				});
		}
	}
	handleDateChange(event) {
		this.currentDate = event.target.value;
		this.currentDate2 = event.target.value;
		this.dataMantroyDispable = false; // Enable the 'Submit' button
		const selectedDate = new Date(this.currentDate);
		const today = new Date();
		if (selectedDate > today) {
			this.showText = true; // Show the message
			this.futuredatedisable = true;
			this.dataMantroyDispable = true; // Show the future date error message
		}
		else {
			this.showText = false; // Hide the message
			this.futuredatedisable = false; // Hide the future date error message
		}
		// Call the checkDateUniqueness function
		this.checkDateUniqueness();
	}
	handleRadioChange(event) {
		this.chsngedVal = event.detail.value;
		this.gpp = this.chsngedVal;
		// Assuming that this.chsngedVal is a string, use 'true' (string) instead of true (boolean)
		this.showMessage = this.chsngedVal === label.YES;
	}
	readAsDataURL(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event.target.result;
				if (typeof result === 'string') {
					// Directly resolve if the result is already a string
					resolve(result);
				}
				else {
					// Convert ArrayBuffer to string if necessary
					const base64String = btoa(new Uint8Array(result)
						.reduce((data, byte) => data + String.fromCharCode(byte), ''));
					resolve(`data:image/${blob.type.split('/')[1]};base64,${base64String}`);
				}
			};
			reader.onerror = (error) => {
				reject(error);
			};
			reader.readAsDataURL(blob);
		});
	}
	checksubmit() {
		if (this.carePlanTemplateName) {
			this.openundersatand();
		}
	}
	handleClickpdf() {
		this.fileMessage = true;
		this.closeAllDropdowns();
		const newArray = this.getNewImageUrls();
		const fileContents = this.extractFileContents(newArray);
		this.recentImages = true;
		this.fileChangeColour = "card-header-accord";
		this.fileWork = true;
		if (this.resultId) {
			this.saveFilesAndCreateLinks(this.resultId, fileContents);
		}
		if (this.lastsymptomid) {
			this.saveFilesAndCreateLinks(this.lastsymptomid, fileContents);
		}
	}
	// Closes all dropdowns
	closeAllDropdowns() {
		this.isDropDownOpen1 = false;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen4 = false;
	}
	// Filters out new image URLs
	getNewImageUrls() {
		return this.imageUrls.filter(imageUrl => !this.oldimageurl.includes(imageUrl))
			.map(imageUrl => {
				this.oldimageurl.push(imageUrl);
				return imageUrl;
			});
	}
	// Extracts file contents from image URLs
	extractFileContents(imageUrls) {
		return imageUrls.map(imageUrl => imageUrl.split(",")[1]);
	}
	// Saves files and creates content document links
	saveFilesAndCreateLinks(parentId, fileContents) {
		SAVE_FILES({
				fileContents,
				parentId,
				fileTitle: this.fileTitle,
				filePath: this.filePath
			})
			.then(attachmentIds => this.createContentDocumentLinks(parentId, attachmentIds))
			.catch(error => this.handleError(error.body.message));
	}
	// Creates content document links
	createContentDocumentLinks(parentId, attachmentIds) {
		try {
			CREATE_CONTENT_DOCUMENT_LINKS({
				fileIds: attachmentIds,
				symptomTrackerId: parentId
			});
		}
		catch (error) {
			this.handleError(error.body.message);
		}
	}
}