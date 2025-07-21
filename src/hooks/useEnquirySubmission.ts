
import { useState, useCallback } from 'react';

// Global state to track if any enquiry has been submitted during this session
let globalEnquirySubmitted = false;

export const useEnquirySubmission = () => {
  const [hasSubmittedEnquiry, setHasSubmittedEnquiry] = useState(globalEnquirySubmitted);

  const markEnquirySubmitted = useCallback(() => {
    globalEnquirySubmitted = true;
    setHasSubmittedEnquiry(true);
    
    // Store in sessionStorage for persistence across page refreshes
    sessionStorage.setItem('enquiry_submitted', 'true');
  }, []);

  const checkEnquirySubmitted = useCallback(() => {
    // Check both global state and sessionStorage
    const sessionSubmitted = sessionStorage.getItem('enquiry_submitted') === 'true';
    if (sessionSubmitted && !globalEnquirySubmitted) {
      globalEnquirySubmitted = true;
      setHasSubmittedEnquiry(true);
    }
    return globalEnquirySubmitted || sessionSubmitted;
  }, []);

  return {
    hasSubmittedEnquiry: hasSubmittedEnquiry || checkEnquirySubmitted(),
    markEnquirySubmitted
  };
};
