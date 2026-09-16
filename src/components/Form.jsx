import React, { useState, useMemo } from 'react';
import { User, Mail, Phone, Tag, MessageSquare, Send, Check } from 'lucide-react';
import { FormField } from './FormField';
import { ValidationProgress } from './ValidationProgress';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateSubject,
  validateMessage,
  validateTerms,
  validateForm,
} from '../utils/validation';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  terms: false,
};

const SUBJECT_OPTIONS = [
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Project Collaboration', label: 'Project Collaboration' },
  { value: 'Technical Support', label: 'Technical Support' },
  { value: 'Portfolio Feedback', label: 'Portfolio Feedback' },
];

export const Form = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute validation errors dynamically on state change (Real-Time Validation)
  const validationResults = useMemo(() => {
    return validateForm(formData);
  }, [formData]);

  const { errors, isFormValid } = validationResults;

  // Calculate completion count (fields with non-empty values and no error)
  const completedCount = useMemo(() => {
    let count = 0;
    if (formData.fullName.trim() && !errors.fullName) count++;
    if (formData.email.trim() && !errors.email) count++;
    if (formData.phone.trim() && !errors.phone) count++;
    if (formData.subject && !errors.subject) count++;
    if (formData.message.trim() && !errors.message) count++;
    if (formData.terms && !errors.terms) count++;
    return count;
  }, [formData, errors]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Touch all fields to show errors if user tries submitting invalid form
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      terms: true,
    };
    setTouched(allTouched);

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API network call delay
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 600);
  };

  return (
    <div className="form-card">
      <ValidationProgress completedCount={completedCount} totalCount={6} />

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Full Name */}
          <FormField
            id="fullName"
            name="fullName"
            label="Full Name"
            placeholder="e.g. Alex Morgan"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={() => handleBlur('fullName')}
            error={errors.fullName}
            touched={touched.fullName}
            required
            icon={User}
          />

          {/* Email Address */}
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="e.g. alex@example.com"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            required
            icon={Mail}
          />

          {/* Phone Number */}
          <FormField
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="e.g. +1 (555) 000-1234"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={() => handleBlur('phone')}
            error={errors.phone}
            touched={touched.phone}
            required
            icon={Phone}
          />

          {/* Inquiry Topic / Subject */}
          <FormField
            id="subject"
            name="subject"
            type="select"
            label="Inquiry Topic"
            placeholder="Choose topic..."
            value={formData.subject}
            onChange={handleInputChange}
            onBlur={() => handleBlur('subject')}
            error={errors.subject}
            touched={touched.subject}
            required
            icon={Tag}
            options={SUBJECT_OPTIONS}
          />

          {/* Message Content */}
          <FormField
            id="message"
            name="message"
            type="textarea"
            label="Message Details"
            placeholder="Describe your inquiry or message here (minimum 10 characters)..."
            value={formData.message}
            onChange={handleInputChange}
            onBlur={() => handleBlur('message')}
            error={errors.message}
            touched={touched.message}
            required
            icon={MessageSquare}
            maxLength={1000}
            fullWidth
            rows={4}
          />

          {/* Terms and Conditions Checkbox */}
          <div className={`field-group full-width checkbox-group ${touched.terms && errors.terms ? 'is-invalid' : ''}`}>
            <label className="checkbox-label" htmlFor="terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleInputChange}
                onBlur={() => handleBlur('terms')}
                className="hidden-checkbox"
                aria-invalid={touched.terms && !!errors.terms}
              />
              <span className="checkbox-custom">
                {formData.terms && <Check size={14} strokeWidth={3} />}
              </span>
              <span>
                I agree to the <strong>Terms of Service</strong> and consent to processing my contact information. <span className="required-asterisk">*</span>
              </span>
            </label>

            {touched.terms && errors.terms && (
              <div className="field-footer">
                <span className="error-message" role="alert">
                  {errors.terms}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send size={18} />
                Submit Form
              </>
            )}
          </button>
          {!isFormValid && (
            <p className="submit-tooltip">
              Please complete all required fields correctly to enable form submission.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
