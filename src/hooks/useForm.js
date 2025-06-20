import { useState } from 'react';

// 폼 상태 관리 커스텀 훅
export const useForm = (initialValues = {}, validationFn = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // 입력 중에 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // 폼 검증 실행
  const validate = () => {
    if (!validationFn) return { isValid: true, errors: {} };
    
    const validation = validationFn(values);
    setErrors(validation.errors || {});
    return validation;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (submitFn) => {
    setIsSubmitting(true);
    
    try {
      const validation = validate();
      
      if (!validation.isValid) {
        setIsSubmitting(false);
        return { success: false, errors: validation.errors };
      }

      const result = await submitFn(values);
      setIsSubmitting(false);
      return result;
    } catch (error) {
      setIsSubmitting(false);
      return { success: false, error: error.message };
    }
  };

  // 폼 리셋
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  // 특정 필드 에러 설정
  const setFieldError = (fieldName, errorMessage) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };

  // 전체 에러 설정
  const setFormErrors = (newErrors) => {
    setErrors(newErrors);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validate,
    reset,
    setFieldError,
    setFormErrors,
  };
};

export default useForm;
