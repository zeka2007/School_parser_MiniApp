import { FC } from "react";
import './NumberInputs.css'
import { IconButton, Text } from "@telegram-apps/telegram-ui";
import MarkChip from "../MarkChip/MarkChip";
import { IconChevronDown } from "./IconChevronDown";
import { IconChevronUp } from "./IconChevronUp";

export const NumberInput: FC<{
  label?: string,
  value?: number,
  onChange?: CallableFunction,
  disableUpBtn?: boolean
  disableDownBtn?: boolean
}> = ({ label, value, onChange, disableUpBtn, disableDownBtn }) => {

  const val = value ?? 0;

  const valUp = () => {
    if (onChange) onChange(val + 1)
  }

  const valDown = () => {
    if (onChange) onChange(val - 1)
  }

  return (
    <div>
      {label && <div><Text>{label}</Text></div>}

      <div className="number-input-container">
        <IconButton onClick={valUp} mode="plain" disabled={disableUpBtn}><IconChevronUp /></IconButton>
        <MarkChip>{val}</MarkChip>
        <IconButton onClick={valDown} mode="plain" disabled={disableDownBtn}><IconChevronDown /></IconButton>
      </div>
    </div>

  );
};