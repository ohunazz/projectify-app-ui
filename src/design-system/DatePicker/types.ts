import { ReactDatePickerProps } from "react-datepicker";
import { InputSize } from "../Input";

interface BaseDataPickerProps {
    selected: ReactDatePickerProps["selected"];
    onSelect?: (value: Date) => void;
    onChange: ReactDatePickerProps["onChange"];
    placeholder: string;
    disabled?: boolean;
    inputSize?: InputSize;
    shape?: "rounded" | "circle";
}

type SelectsRangeProps =
    | {
          selectsRange: true;
          startDate: ReactDatePickerProps["startDate"];
          endDate: ReactDatePickerProps["endDate"];
      }
    | { selectsRange?: false; startDate?: never; endDate?: never };

export type DatePickerProps = BaseDataPickerProps & SelectsRangeProps;

export type DatePickerOnChangeDateType =
    | Date
    | null
    | [Date | null, Date | null];
