document.getElementById('upload-data-form').reset()
document.getElementById('upload-config-form').reset()

$('#upload-config-btn').on('click',function () {
    readConfigFile(document.getElementById('config-file'))
})

$('#classification1-btn').on('click',function () {
    readDataFileClassification1(document.getElementById('data-file'))
})

$('#classification2-btn').on('click',function () {
    readDataFileClassification2(document.getElementById('data-file'))
})

$('#save-txt-btn').on('click',function () {
    let dataset = document.getElementById("board").innerText;
    downloadToFile(dataset, 'dataset.txt', 'text/plain')
})

$('#save-html-btn').on('click',function () {
    let dataset = document.getElementById("board").innerHTML;
    downloadToFile(dataset, 'dataset.html', 'text/plain')
})

$('#save-json-btn').on('click',function () {
    let dataset = JSON.stringify(MainDataSet)
    downloadToFile(dataset, 'dataset.json', 'text/plain')
})

$('#back-btn').on("click",function(){
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
});

function displayDataSet(dataSet) {
    let html = "<table cellspacing='0'>"

    html += "<tr class='table-head'>"
    html += "<th>id</th>"
    for (let icol = 0; icol < Config.ColumnTypes.length; icol++) {
        html += `<th>${Config.ColumnTypes[icol]}</th>`
    }
    html += "</tr>"
    for(let irow = 0; irow < dataSet.length; irow++) {
        html += "<tr>"
        html += `<th>${irow+1}</th>`
        for (let icol = 0; icol < dataSet[irow].length; icol++) {
            html += `<th>${dataSet[irow][icol]}</th>`
        }
        html += "</tr>"
    }
    html += "</table>"

    document.getElementById("board").innerHTML = html
    $('html,body').animate({
        scrollTop: $(`#board`).offset().top
    }, 'slow');
}

function readDataFileClassification1(filePath) {
    try {
        if (checkFileAPI() === false)
            return false
        let reader = new FileReader()
        let output = ""
        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                beginClassification1(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                let file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                beginClassification1(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' +
                        'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                        'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        } else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }
    }
    catch (e) {
        alert(`Wystąpił błąd w trakcie wczytywania próbek wzorcowych: Nie można załadować pliku z próbkami wzorcowymi!`)
        throw new Error(`${e.message}`)
    }
    return true;
}

function readDataFileClassification2(filePath) {
    try {
        if (checkFileAPI() === false)
            return false
        let reader = new FileReader()
        let output = ""
        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                beginClassification2(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                let file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                beginClassification2(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' +
                        'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                        'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        } else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }
    }
    catch (e) {
        alert(`Wystąpił błąd w trakcie wczytywania próbek wzorcowych: Nie można załadować pliku z próbkami wzorcowymi!`)
        throw new Error(`${e.message}`)
    }
    return true;
}

function readConfigFile(filePath) {
    try {
        if (checkFileAPI() === false)
            return false
        let reader = new FileReader()
        let output = ""
        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                processConfigFile(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                let file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                processConfigFile(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' +
                        'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                        'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        } else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }
    }
    catch (e) {
        alert(`Błąd pliku konfiguracyjnego: Nie można załadować pliku konfiguracyjnego!`)
        throw new Error(`${e.message}`)
    }
    return true;
}

function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});

    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};
