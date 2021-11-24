// IGNORE THESE DECLARATIONS:
let study_introduction = [];
let study_conclusion = [];
let slideshow_possibilities = new Map();

// CHANGE OR MODIFY THIS STUFF:

// There is no guarantee that every participant is assigned a unqiue identifier. Keep this number semi-large (10+)
// to ensure that it is highly unlikely that two participants are assigned the same identifier.
let length_of_participant_id = 12

let name_of_xlsx_file = "slideshows.xlsx"

let default_advancement_key = "spacebar"

let display_random_slideshow = false

// Can optionally be filled out if display_random_slideshow is true
let slideshow_blacklist = []

addToIntro("text",
    "Welcome to the experiment.<br><br>" +
    "After completing the experiment, you will be shown a session ID, <b>make sure to record it.</b><br><br>" + 
    "Please note, you <b>must</b> have a <b>keyboard</b> for this experiment.<br><br>" +
    "Press the spacebar to begin.",
    null)

addToIntro("resize",
    "Click and drag the lower right corner of the box until the box is the same size as a credit card held up to the screen.",
    null)

addToIntro("text",
    "Please advance through the slideshow at your own pace.<br><br>" +
    "Remember to follow the given instructions.<br><br>" +
    "Press the spacebar to advance.",
    new Map([["post_trial_gap", 500]]))

addToConclusion("text",
    "You have completed this section of the study.<br><br>" + 
    "You are about to see your session ID,<br><br>" + 
    "<b>You MUST copy it and paste it into the survey which brought you here.</b><br><br>" +
    "Once you have copied that code, you may close this tab.<br><br>" +
    "Press the 'Enter' key to continue",
    new Map([["key_choices", ["Enter"]]]))

// THESE FUNCTIONS ARE HOW YOU INTERACT WITH THE PROGRAM
// I LEFT THEM HERE IN CASE YOU ARE CURIOUS HOW THEY WORK
function isAcceptedDataType(dataType) {
    let lowercasedatatype = dataType.toLowerCase()
    if (lowercasedatatype == "resize" ||
        lowercasedatatype == "text") {
        return true;
    }
    return false;
}

function addToIntro(dataType, text, additional_options) {
    if (isAcceptedDataType(dataType)) {
        study_introduction.push([dataType.toLowerCase(), "<p>"+text+"</p>", additional_options])
    } else {
        console.log("Failed to add data type '" + dataType + "' to the introduction.")
    }
}

function addToConclusion(dataType, text, additional_options) {
    if (isAcceptedDataType(dataType)) {
        study_conclusion.push([dataType.toLowerCase(), "<p>"+text+"</p>", additional_options])
    } else {
        console.log("Failed to add data type '" + dataType + "' to the conclusion.")
    }
}