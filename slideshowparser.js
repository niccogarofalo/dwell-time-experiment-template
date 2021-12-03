function makeParticipantId(length) {
    console.log("creating participant ID with length " + length)
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// infoData comes in the form [dataType: string, displayText: string, additionalOptions: Map]
function parseJavaScriptData(infoData) {
    let dataType = infoData[0];
    let displayText = infoData[1];
    let additionalOptions = infoData[2];
    if (additionalOptions == null) {
        additionalOptions = new Map()
    }
    console.log("Data to be added to timeline:")
    console.log(infoData)
    switch (dataType) {
        case "resize":
            return {
                type: 'resize',
                item_width: 3 + 3/8,
                item_height: 2 + 1/8,
                prompt: displayText,
                pixels_per_unit: 150
            }
        case "text":
            let tempStorage = {
                type: 'html-keyboard-response',
                stimulus: displayText,
                choices: [default_advancement_key]
            }
            if (additionalOptions.has('key_choices')) {
                tempStorage.choices = additionalOptions.get('key_choices');
            }
            if (additionalOptions.has('post_trial_gap')) {
                tempStorage.post_trial_gap = additionalOptions.get('post_trial_gap');
            }
            return tempStorage;
    }
}

// sheetJsonData: The Json data of a single worksheet (a list of objects, each may have properties 'type', 'data', and 'options')
// filmToShow: The name of that slideshow (name of folder that stimuli files are found in)
// returns: a list of stimuli that can be used by jsPsych
function parseWorksheetData(sheetJsonData, filmToShow) {
    let wsData = [];
    for (let row of sheetJsonData) {
        let fileType = row.type;
        let data = row.data;
        let options = {}
        if (row.options != null) {
            options = JSON.parse(row.options)
        }
        if (fileType == null) {
            let extIndex = data.lastIndexOf('.');
            if (extIndex >= 0) {
                fileType = data.substr(extIndex + 1);
            } else {
                fileType = "text"
            }
        }
        switch (fileType) {
            case 'image': case 'jpg': case 'jpeg': case 'png': case 'gif':
                let imageStim = {
                    type: 'image-keyboard-response',
                    stimulus: "./slideshow-directory/" + filmToShow + "/" + data,
                    choices: [default_advancement_key],
                    is_image: true
                }
                wsData.push(imageStim)
                break;
            case 'video': case 'mp4': case 'mov': case 'flv':
                let vidStim = {
                    type: 'video-keyboard-response',
                    sources: ["./slideshow-directory/" + filmToShow + "/" + data],
                    choices: [default_advancement_key]
                }
                wsData.push(vidStim)
                break;
            case 'audio': case 'mp3': case 'wav':
                let audioStim = {
                    type: 'audio-keyboard-response',
                    stimulus: "./slideshow-directory/" + filmToShow + "/" + data,
                    choices: [default_advancement_key]
                }
                if ('trial_ends_after_audio' in options) {
                    audioStim.trial_ends_after_audio = options.trial_ends_after_audio
                }
                if ("prompt" in options) {
                    audioStim.prompt = options.prompt
                }
                wsData.push(audioStim)
                break;
            case 'text':
                let textStim = {
                    type: 'html-keyboard-response',
                    stimulus: data,
                    choices: [default_advancement_key]
                }
                wsData.push(textStim)
                break;
        }
    }
    return wsData
}

// workbook: workbook data of the excel sheet
// returns: a list of worksheets in json form followed by the worksheet's name, such that each can be parsed by parseWorksheetData.
//      takes the form - [{worksheet1}, "worksheet1name", {worksheet2}, "worksheet2name", {worksheet3}, "worksheet3name", ...]
function getWorksheetsJson(workbook, urlParamSlideshow) {
    if (display_random_slideshow || urlParamSlideshow === "RANDOM") {
        let slideshowNumber = Math.floor(Math.random() * workbook.SheetNames.length);
        let slideshowName = workbook.SheetNames[slideshowNumber];
        let sheet = workbook.Sheets[slideshowName];
        let sheetJson = XLSX.utils.sheet_to_json(sheet);
        return [sheetJson, slideshowName]
    }
    let foundSlideshow = false;
    for (var tempName of workbook.SheetNames) {
        if (urlParamSlideshow == tempName) {
            foundSlideshow = true;
        }
    }
    if (!foundSlideshow) {
        return [getSheetErrorJson("Could not find slideshow '" + urlParamSlideshow + "'"), "N/A"]
    }
    return [XLSX.utils.sheet_to_json(workbook.Sheets[urlParamSlideshow]), urlParamSlideshow]
}

// returns: json that represents a worksheet. A single text stimuli that displays error 'message'.
function getSheetErrorJson(message) {
    return [{
        type: "text",
        data: "Error: " + message
    }];
}
