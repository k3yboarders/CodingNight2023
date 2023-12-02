import * as React from 'react';
import {
    Select as BaseSelect,
    SelectProps,
    selectClasses,
    SelectRootSlotProps,
} from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { Popper as BasePopper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

const Select = React.forwardRef(function Select<
    TValue extends {},
    Multiple extends boolean,
>(props: SelectProps<TValue, Multiple>, ref: React.ForwardedRef<HTMLButtonElement>) {
    const slots: SelectProps<TValue, Multiple>['slots'] = {
        root: CustomButton,
        listbox: Listbox,
        popper: Popper,
        ...props.slots,
    };

    return <BaseSelect {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}, Multiple extends boolean>(
    props: SelectProps<TValue, Multiple> & React.RefAttributes<HTMLButtonElement>,
) => JSX.Element;

export default function StyledSelect() {
    return (
        <Select>
            <Option value={'BOMBING'}>Bombardowanie</Option>
            <Option value={'TERRORIST_ATTACK'}>Atak terrorystyczny</Option>
            <Option value={'EARTHQUAKE'}>Trzęsienie ziemi</Option>
            <Option value={'TSUNAMI'}>Tsunami</Option>
            <Option value={'TORNADO'}>Tornado</Option>
            <Option value={'FAMINE'}>Głód</Option>
            <Option value={'ROAD_ACCIDENT'}>Zdarzenie drogowe</Option>
        </Select>
    );
}

const CustomButton = React.forwardRef(function CustomButton<
    TValue extends {},
    Multiple extends boolean,
>(
    props: SelectRootSlotProps<TValue, Multiple>,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const { ownerState, ...other } = props;
    return (
        <StyledButton type="button" {...other} ref={ref}>
            {other.children}
            <UnfoldMoreRoundedIcon />
        </StyledButton>
    );
});

const StyledButton = styled('button', { shouldForwardProp: () => true })(
    () => `
  position: relative;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  text-align: left;
  line-height: 1.5;
  background: #f2f2f2;
  color: #6f6f6f;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: #e5e5e5;
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const Listbox = styled('ul')(
    () => `
  display: block;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #f2f2f2;
  color: #6f6f6f;
  z-index: 999;
  `,
);

const Option = styled(BaseOption)(
    () => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #4045c9;
    color: #fff;
  }

  &.${optionClasses.highlighted} {
    background-color: #e5e5e5;
    color: #6f6f6f;
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: #4045c9;
    color: #fff;
  }

  &.${optionClasses.disabled} {
    color: #e5e5e5;
  }

  &:hover:not(.${optionClasses.disabled}) {
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.1);
  }
  `,
);

const Popper = styled(BasePopper)`
  z-index: 1;
`;