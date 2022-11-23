
importScripts('db.js')


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    console.log(request);
    
    if(request.message == "insert")
    {
        console.log("insert")
        let proccess = insert_records(request.payload)
        proccess.then(res =>{
            console.log("insert")
            sendResponse(res);
        })
    }
    else if(message == "get"){
        let proccess = get_record(request.payload);
        proccess.then(res => {
            chrome,runtime.sendMessage({
                message:"get_success",
                payload:res
            })
        })
    }
    else if(message == "update"){
        let proccess = get_record(request.payload);
        proccess.then(res => {
            chrome,runtime.sendMessage({
                message:"update_success",
                payload:res
            })
        })
    }
    else if(message == "delete"){
        let proccess = get_record(request.payload);
        proccess.then(res => {
            chrome,runtime.sendMessage({
                message:"delete_success",
                payload:res
            })
        })
    }
    chrome.runtime.lastError ;
})