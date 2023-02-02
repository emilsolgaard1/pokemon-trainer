export class StorageUtil {

    /** Save a key/value pair in session storage. */
    public static storageSave<T>(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    /** 
     * Try to get a specific value from session storage. 
     * If key/value pair doesn't exist, returns undefined.
     * */
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key)
        try {
            if (storedValue) {
                return JSON.parse(storedValue) as T
            }

            return undefined
        } catch (error) {
            sessionStorage.removeItem(key)
            return undefined
        }
    }

    /** Delete specific key/value pair in session storage. */
    public static storageDelete<T>(key: string): void {
        sessionStorage.removeItem(key)
    }

    /** Clear all session storage. */
    public static storageClear() : void {
        sessionStorage.clear()
    }
}

