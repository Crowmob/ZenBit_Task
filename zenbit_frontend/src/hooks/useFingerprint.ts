// src/hooks/useFingerprint.ts
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();

        if (isMounted) {
          setFingerprint(result.visitorId);
        }
      } catch (error) {
        console.error('Fingerprint error:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFingerprint();

    return () => {
      isMounted = false;
    };
  }, []);

  return { fingerprint, loading };
};