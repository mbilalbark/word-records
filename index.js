
document.getElementById("add-word").addEventListener ("click", event =>{
    event.preventDefault();
    let formData = new FormData(document.getElementById("add-form"))

    let newPayload = {
        "english":formData.get("english"),
        "turkish":formData.get("turkish")
    }
    console.log("test")
    chrome.runtime.sendMessage({
        message:"insert",
        payload:newPayload
    })
});