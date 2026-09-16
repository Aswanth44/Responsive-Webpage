/**
 * Utility validation routines for form field verification.
 */

// Email regex meeting RFC 5322 simplified standard
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Flexible phone format supporting US, UK, International formats (+ country code, spaces, dashes, parens)
export const PHONE_REGEX = /^\+?([0-9]{1,4})?[-. ]?(\(?\d{2,4}\)?)?[-. ]?\d{3,4}[-. ]?\d{3,4}$/;

/**
 * Validates full name.
 * @param {string} name 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateFullName = (name) => {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Full name is required.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters.' };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes.' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validates email address format.
 * @param {string} email 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateEmail = (email) => {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Email address is required.' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid email address (e.g., alex@domain.com).' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validates phone number format.
 * @param {string} phone 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validatePhone = (phone) => {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Phone number is required.' };
  }
  // Count digits only to ensure realistic length
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return { isValid: false, message: 'Phone number must contain between 7 and 15 digits.' };
  }
  if (!PHONE_REGEX.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid phone number (e.g., +1 (555) 000-1234).' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validates inquiry subject selection.
 * @param {string} subject 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateSubject = (subject) => {
  if (!subject || subject === '') {
    return { isValid: false, message: 'Please select an inquiry topic.' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validates message content.
 * @param {string} message 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateMessage = (message) => {
  const trimmed = (message || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Message content is required.' };
  }
  if (trimmed.length < 10) {
    return { isValid: false, message: `Message must be at least 10 characters (${10 - trimmed.length} more needed).` };
  }
  if (trimmed.length > 1000) {
    return { isValid: false, message: 'Message cannot exceed 1000 characters.' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validates terms acceptance.
 * @param {boolean} termsAccepted 
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateTerms = (termsAccepted) => {
  if (!termsAccepted) {
    return { isValid: false, message: 'You must agree to the privacy policy and terms.' };
  }
  return { isValid: true, message: '' };
};

/**
 * Validates entire form state map.
 * @param {Object} formData 
 * @returns {Object} object containing individual field errors and overall isValid state
 */
export const validateForm = (formData) => {
  const errors = {
    fullName: validateFullName(formData.fullName).message,
    email: validateEmail(formData.email).message,
    phone: validatePhone(formData.phone).message,
    subject: validateSubject(formData.subject).message,
    message: validateMessage(formData.message).message,
    terms: validateTerms(formData.terms).message,
  };

  const isFormValid = Object.values(errors).every((errorMsg) => errorMsg === '');

  return { errors, isFormValid };
};
