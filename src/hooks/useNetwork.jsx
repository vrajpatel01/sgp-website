import { useEffect, useState } from "react";

export default function useNetwork() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        window.addEventListener("online", () => setIsOnline(window.navigator.onLine));
        window.addEventListener("offline", () => setIsOnline(window.navigator.onLine));
    }, []);

    return isOnline;
}