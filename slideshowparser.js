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

function parseWorksheetData(sheetJsonData, filmToShow) {
    let wsData = [];
    for (let row of sheetJsonData) {
        let fileType = row.type;
        let data = row.data;
        let options = row.options;
        if (fileType == null) {
            let extIndex = data.lastIndexOf('.');
            if (extIndex >= 0) {
                fileType = data.substr(extIndex + 1);
            } else {
                fileType = "text"
            }
        }
        console.log(fileType)
        switch (fileType) {
            case 'image' | 'jpg' | 'jpeg' | 'png' | 'gif':
                let imageStim = {
                    type: 'image-keyboard-response',
                    stimulus: "./slideshow-directory/" + filmToShow + "/" + data,
                    choices: [default_advancement_key],
                    is_image: true
                }
                wsData.push(imageStim)
                break;
            case 'video' | 'mp4' | 'mov' | 'flv':
                let vidStim = {
                    type: 'video-keyboard-response',
                    stimulus: "./slideshow-directory/" + filmToShow + "/" + data,
                    choices: [default_advancement_key]
                }
                wsData.push(vidStim)
                break;
            case 'audio' | 'mp3' | 'wav':
                let audioStim = {
                    type: 'audio-keyboard-response',
                    stimulus: "./slideshow-directory/" + filmToShow + "/" + data,
                    choices: [default_advancement_key]
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
