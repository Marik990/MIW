document.getElementById('upload-data-form').reset()

$('#back-btn').on("click",function(){
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
});

$('#upload-data-btn').on('click',function () {
    readDataFile(document.getElementById('data-file'))
})

function displayText(text) {
    document.getElementById(elementId).innerText = text

    $('html,body').animate({
        scrollTop: $(`#board`).offset().top
    }, 'slow');
}

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

function readDataFile(filePath) {
    try {
        if (checkFileAPI() === false)
            return false
        let reader = new FileReader()
        let output = ""
        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                processDataFileContent(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                let file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                processDataFileContent(output);
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
        alert(`Błąd: Nie można załadować pliku z danymi!`)
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
        alert(`Błąd: Nie można załadować pliku konfiguracyjnego!`)
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