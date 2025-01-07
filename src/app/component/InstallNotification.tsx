'use client';
// InstallNotification.tsx
import { useEffect, useState } from "react";

const InstallNotification = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome);
        setIsInstallable(false);
      });
    }
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <p className="text-sm">Install the Comforty app for a better experience!</p>
      <button onClick={handleInstall} className="mt-2 bg-teal-700 px-4 py-2 rounded-lg text-white">
        Install
      </button>
    </div>
  );
};

export default InstallNotification;
