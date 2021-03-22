import { useState, useEffect, useRef } from "react";

import "./styles/inline-input-edit.css";

interface EditableProps {
  text: string;
  isEditing?: boolean;
  emptyEdit?: boolean;

  labelCursor?: string | undefined;
  labelClassName?: string | undefined;
  labelFontSize?: string | number | undefined;
  labelFontWeight?: any | undefined;
  labelPlaceHolder?: string | number | undefined;

  inputMaxLength?: number | undefined;
  inputPlaceHolder?: string | undefined;
  inputTabIndex?: number | undefined;
  inputWidth?: string | number | undefined;
  inputHeight?: string | number | undefined;
  inputFontSize?: string | number | undefined;
  inputFontWeight?: any | undefined;
  inputClassName?: string | undefined;
  inputBorderWidth?: string | number | undefined;

  onFocus?: (text: string) => void;
  onFocusOut?: (text: string) => void;
}

// interface Props extends EditableProps {}

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

const DEFAULT_LABEL_PLACEHOLDER = "Click to edit";

export const InlineInputEdit = (props: EditableProps) => {
  const [isEditing, setIsEditing] = useState(props.isEditing || false);
  const [text, setText] = useState(props.text || "");
  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (text) {
      setText(text);
    }
  }, [text]);

  useEffect(() => {
    setIsEditing(isEditing);
  }, [isEditing]);

  const isTextValueValid = () =>
    typeof text != "undefined" && text.trim().length > 0;

  const handleFocus = () => {
    if (isEditing) {
      if (typeof props.onFocusOut === "function") {
        props.onFocusOut(props.text);
      }
    } else {
      if (typeof props.onFocus === "function") {
        props.onFocus(props.text);
      }
    }

    if (isTextValueValid()) {
      setIsEditing(!isEditing);
    } else {
      if (isEditing) {
        setIsEditing(props.emptyEdit || false);
      } else {
        setIsEditing(true);
      }
    }
  };

  const handleEnterFocus = () => {
    if (isEditing) {
      if (typeof props.onFocusOut === "function") {
        props.onFocusOut(text);
      }
    } else {
      if (typeof props.onFocus === "function") {
        props.onFocus(text);
      }
    }

    if (isTextValueValid()) {
      setIsEditing(!isEditing);
    } else {
      if (isEditing) {
        setIsEditing(props.emptyEdit || false);
      } else {
        setIsEditing(true);
      }
    }
  };

  const handleChange = () => {
    if (textInput.current !== null) {
      setText(textInput?.current?.value);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      handleEnterKey();
    }

    if (e.keyCode === ESC_KEY_CODE) {
      handleEscKey();
    }
  };

  const handleEnterKey = () => {
    handleEnterFocus();
  };

  const handleEscKey = () => {
    handleFocus();
  };

  const inputProps = {
    // ["data-testid"]: "input-component",
    value: text,
    ref: textInput,
    onBlur: handleFocus,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    tabIndex: props.inputTabIndex,
    maxLength: props.inputMaxLength,
    className: props.inputClassName,
    placeholder: props.inputPlaceHolder,
    style: {
      width: props.inputWidth,
      height: props.inputHeight,
      fontSize: props.inputFontSize,
      fontWeight: props.inputFontWeight,
      borderWidth: props.inputBorderWidth,
    },
  };

  if (isEditing) {
    return (
      <div className="inlineInputEdit__input">
        <input
          className="inlineInputEdit__input"
          type="text"
          autoFocus
          {...inputProps}
        />
      </div>
    );
  }

  const labelText = isTextValueValid()
    ? text
    : props.labelPlaceHolder || DEFAULT_LABEL_PLACEHOLDER;

  const labelProps = {
    // ["data-testid"]: "label-component",
    className: props.labelClassName,
    onClick: handleFocus,
    style: {
      cursor: props.labelCursor || "auto",
      fontSize: props.labelFontSize,
      fontWeight: props.labelFontWeight,
    },
  };

  return (
    <>
      <label {...labelProps}>{labelText}</label>
    </>
  );
};
