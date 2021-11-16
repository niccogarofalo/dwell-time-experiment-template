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
                choice: ['spacebar']
            }
            if (additionalOptions.has('key_choices')) {
                tempStorage.choice = additionalOptions.get('key_choices')
            }
            if (additionalOptions.has('post_trial_gap')) {
                tempStorage.post_trial_gap = additionalOptions.get('post_trial_gap')
            }
            return tempStorage;
    }
}