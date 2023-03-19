export default class StorageHelper {

    constructor() {
        if (!('indexedDB' in window)) {
            console.error("This browser doesn't support IndexedDB");
        }
        this.dbName = "pwa_from_scratch";
        this.datasetName = "reports";
        this.datasetKeyName = "date";
    }

    _query(options) {
        let db = window.indexedDB.open(this.dbName, 1);

        db.onerror = (event) => {
            return this.onError(event);
        };

        db.onupgradeneeded = (event) => {
            return this.onUpgradeNeeded(event);
        }

        // connection established
        db.onsuccess = (event) => {
            const db = event.target.result;

            const transaction = db.transaction([this.datasetName], "readwrite");
            const objectStore = transaction.objectStore(this.datasetName);

            if (options.action === 'getAll') {
                const req = objectStore.getAll();
                req.onsuccess = (event) => {
                    console.log(event.target.result);
                }
            } else if (options.action === 'get') {
                const req = objectStore.get(options.params.date);
                req.onsuccess = (event) => {
                    console.log(event.target.result);
                }
            } else if (options.action === 'saveReport') {
                const req = objectStore.add({"date": options.report.date, content: options.report.content});
                req.onsuccess = (event) => {
                    console.log(event.target.result);
                }
            }

            transaction.oncomplete = (event) => {
                db.close();
            }
        }
    }

    onUpgradeNeeded(event) {
        const db = event.target.result;

        const objectStore = db.createObjectStore(this.datasetName, {keyPath: this.datasetKeyName});

        objectStore.createIndex("date", "date", {unique: true});

        objectStore.transaction.oncomplete = (event) => {
            const dataObjectStore = db
                .transaction(this.datasetName, "readwrite")
                .objectStore(this.datasetName);

            [{date: "2023-03-13", content: "bla"}].forEach((report) => {
                dataObjectStore.add(report);
            });
        };
    }

    onError(event) {
        console.error(`Database error: ${event.target.errorCode}`);
    }

    getReports() {
        return this._query({action: 'getAll'});
    }

    saveReport(report) {
        return this._query({action: 'saveReport', report});
    }


}