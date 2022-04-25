import classNames from 'classnames';

const VARIANT_STYLES = {
  sm: 'text-[12px] h-[24px]',
  md: 'text-[16px] h-[32px]',
};

const THEME_STYLES = {
  blue: 'bg-blue-900 text-white',
};

type VARIANT_TYPES = keyof typeof VARIANT_STYLES;
type THEME_TYPES = keyof typeof THEME_STYLES;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: VARIANT_TYPES;
  theme?: THEME_TYPES;
  children?: React.ReactNode;
}

export function Button({
  className: wrapperStyle,
  variant = 'md',
  theme = 'blue',
  children,
  ...rest
}: IButtonProps) {
  return (
    <button
      className={classNames(
        'px-[12px] py-[4px] flex items-center justify-center hover:bg-opacity-80 cursor-pointer',
        VARIANT_STYLES[variant],
        THEME_STYLES[theme],
        wrapperStyle,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
