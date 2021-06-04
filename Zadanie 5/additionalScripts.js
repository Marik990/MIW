$('#back-btn').on("click",function(){
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
});

$('#copy-btn').on("click",function(){
    try{
        //navigator.clipboard.writeText(document.getElementById("board").innerText)
        const el = document.createElement('textarea');
        el.value = document.getElementById("board").innerText
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Skrypt został skopiowany pomyślnie!")
    }
    catch (e) {
        alert(`Wystąpił błąd: ${e.message}`)
        throw new Error(`${e.message}`)
    }
});

function isAttributeInt(attribute) {
    return (!isNaN(attribute) && !isNaN(parseInt(attribute)) && Number.isInteger(parseFloat(attribute)))
}