import { forwardRef } from 'react';

// 버튼 변형 스타일
const buttonVariants = {
  primary: {
    base: 'bg-pink-700 text-white border-[2px] border-pink-700',
    hover: 'hover:opacity-90',
    disabled:
      'disabled:bg-gray-500 disabled:border-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed',
  },
  secondary: {
    base: 'bg-white border-[2px] border-gray-500',
    hover: 'hover:border-pink-700 hover:bg-pink-200',
    disabled:
      'disabled:bg-gray-200 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed',
    text: 'text-black',
  },
  outline: {
    base: 'bg-transparent border-[2px] border-pink-700',
    hover: 'hover:bg-pink-700 hover:text-white',
    disabled: 'disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed',
    text: 'text-pink-700',
  },
  ghost: {
    base: 'bg-transparent border-none',
    hover: 'hover:bg-pink-200',
    disabled: 'disabled:text-gray-500 disabled:cursor-not-allowed',
    text: 'text-black',
  },
  danger: {
    base: 'bg-red-600 text-white border-[2px] border-red-600',
    hover: 'hover:bg-red-700 hover:border-red-700',
    disabled:
      'disabled:bg-gray-500 disabled:border-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed',
  },
};

// 버튼 크기
const buttonSizes = {
  small: 'h-[40px] px-[16px] body-medium',
  medium: 'h-[48px] px-[24px] body-large',
  large: 'h-[56px] px-[32px] body-large',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      loading = false,
      fullWidth = false,
      className = '',
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const variantStyles = buttonVariants[variant];
    const sizeStyles = buttonSizes[size];

    const baseClasses =
      'inline-flex items-center justify-center font-500 rounded-[12px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-offset-2';

    const variantClasses = [
      variantStyles.base,
      variantStyles.hover,
      variantStyles.disabled,
      variantStyles.text,
    ]
      .filter(Boolean)
      .join(' ');

    const fullWidthClass = fullWidth ? 'w-full' : '';

    const finalClassName = [baseClasses, sizeStyles, variantClasses, fullWidthClass, className]
      .filter(Boolean)
      .join(' ');

    const handleClick = (e) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        className={finalClassName}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// 버튼 그룹 컴포넌트
export const ButtonGroup = ({
  children,
  className = '',
  orientation = 'horizontal',
  spacing = 'normal',
}) => {
  const orientationClasses = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  const spacingClasses = {
    tight: orientation === 'horizontal' ? 'gap-1' : 'gap-1',
    normal: orientation === 'horizontal' ? 'gap-4' : 'gap-2',
    loose: orientation === 'horizontal' ? 'gap-6' : 'gap-4',
  };

  return (
    <div className={`flex ${orientationClasses} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
};

// 아이콘 버튼 컴포넌트
export const IconButton = forwardRef(
  ({ icon: Icon, children, iconPosition = 'left', ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

// 로딩 버튼 컴포넌트 (편의를 위한 래퍼)
export const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <Button loading={loading} {...props}>
      {children}
    </Button>
  );
};

export default Button;
