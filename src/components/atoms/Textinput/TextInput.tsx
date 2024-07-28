import styled from './TextInput.module.scss';

interface TextInputProps {
  id: string;
  type: string;
  label?: string;
  name?: string;
  placeHolder?: string;
  iconPath?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  value,
  iconPath,
  placeHolder,
  onFocus,
  onBlur,
  onChange,
}) => {
  return (
    <div className={styled.container}>
      {iconPath?.length && (
        <div className={styled.icon}>
          <img src={iconPath} alt="iconPath" />
        </div>
      )}
      <div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          className={styled.inputField}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
