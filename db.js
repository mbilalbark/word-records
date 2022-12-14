
let db = null;
function create_database() {
    const request = window.indexedDB.open('WordDB');
    request.onerror = function (event) {
        console.log("Problem opening DB.");
    }

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        let objectStore = db.createObjectStore('words', {
            keyPath: 'english'
        });

        objectStore.transaction.oncomplete = function (event) {
            console.log("ObjectStore Created.");
        }
    }

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DB OPENED.");
        //insert_records(words);

        db.onerror = function (event) {
            console.log("FAILED TO OPEN DB.")
        }
    }
}

function insert_records(record) {
    if (db == null) {
        create_database();
    }

    const insert_transaction = db.transaction("words", "readwrite");
    const objectStore = insert_transaction.objectStore("words");

    return new Promise((resolve, reject) => {
        insert_transaction.oncomplete = function () {
            console.log("ALL INSERT TRANSACTIONS COMPLETE.");
            resolve(true);
        }

        insert_transaction.onerror = function () {
            console.log("PROBLEM INSERTING RECORDS.")
            resolve(false);
        }
        let request = objectStore.add(record);
        request.onsuccess = function () {
            console.log("Added: ", record);
        }
        // records.forEach(person => {
        //     let request = objectStore.add(person);

        //     request.onsuccess = function () {
        //         console.log("Added: ", person);
        //     }
        // });
    });
}

function get_record(email) {
    if (db) {
        const get_transaction = db.transaction("words", "readonly");
        const objectStore = get_transaction.objectStore("words");

        return new Promise((resolve, reject) => {
            get_transaction.oncomplete = function () {
            console.log("ALL GET TRANSACTIONS COMPLETE.");
            }

            get_transaction.onerror = function () {
            console.log("PROBLEM GETTING RECORDS.")
            }

            let request = objectStore.get(email);

            request.onsuccess = function (event) {
            resolve(event.target.result);
            }
        });
    }
}

function update_record(record) {
    if (db) {
        const put_transaction = db.transaction("words", "readwrite");
        const objectStore = put_transaction.objectStore("words");

        return new Promise((resolve, reject) => {
            put_transaction.oncomplete = function () {
                console.log("ALL PUT TRANSACTIONS COMPLETE.");
                resolve(true);
            }

            put_transaction.onerror = function () {
                console.log("PROBLEM UPDATING RECORDS.")
                resolve(false);
            }

            objectStore.put(record);
        });
    }
}

function delete_record(email) {
    if (db) {
        const delete_transaction = db.transaction("words", 
        "readwrite");
        const objectStore = delete_transaction.objectStore("words");

        return new Promise((resolve, reject) => {
            delete_transaction.oncomplete = function () {
                console.log("ALL DELETE TRANSACTIONS COMPLETE.");
                resolve(true);
            }

            delete_transaction.onerror = function () {
                console.log("PROBLEM DELETE RECORDS.")
                resolve(false);
            }

            objectStore.delete(email);
        });
    }
}




