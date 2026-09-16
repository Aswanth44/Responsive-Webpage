import React from 'react';
import { CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';

export const FormField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  icon: Icon,
  options = [],
  maxLength,
  fullWidth = false,
  rows = 4,
  helpText,
}) => {
  const showSuccess = touched && !error && value !== '';
  const showError = touched && !!error;

  const errorId = `${id}-error`;

  const fieldGroupClass = `field-group ${fullWidth ? 'full-width' : ''} ${
    showSuccess ? 'is-valid' : ''
  } ${showError ? 'is-invalid' : ''}`;

  return (
    <div className={fieldGroupClass}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="required-asterisk" title="Required field">*</span>}
      </label>

      <div className="input-wrapper">
        {Icon && <Icon className="field-icon-left" size={18} />}

        {type === 'select' ? (
          <>
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className="form-input"
              aria-invalid={showError ? 'true' : 'false'}
              aria-describedby={showError ? errorId : undefined}
            >
              <option value="" disabled>
                {placeholder || 'Select an option...'}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="select-arrow" size={18} />
          </>
        ) : type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
            className="form-input"
            aria-invalid={showError ? 'true' : 'false'}
            aria-describedby={showError ? errorId : undefined}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className="form-input"
            aria-invalid={showError ? 'true' : 'false'}
            aria-describedby={showError ? errorId : undefined}
          />
        )}

        {/* Validation indicator icons on right side */}
        {showSuccess && (
          <div className="validation-icon-right valid" title="Valid entry">
            <CheckCircle2 size={18} />
          </div>
        )}
        {showError && (
          <div className="validation-icon-right invalid" title="Invalid entry">
            <AlertCircle size={18} />
          </div>
        )}
      </div>

      <div className="field-footer">
        {showError ? (
          <span id={errorId} className="error-message" role="alert">
            <AlertCircle size={13} />
            {error}
          </span>
        ) : helpText ? (
          <span className="help-text">{helpText}</span>
        ) : <span />}

        {maxLength && (
          <span className="char-counter">
            {value ? value.length : 0} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
