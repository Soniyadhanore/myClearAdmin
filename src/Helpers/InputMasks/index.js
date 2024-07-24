import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';


/**
 * @description Masked Input for Name
 * @param {*} props
 * @param {*} ref
 * @only accepts only alphabets not numbers at the start
 * @returns NameMask component
 */

export const NameMask = forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={[/^[A-Za-z][A-Za-z0-9@\s]{0,49}$/]}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { value, name: props.name } })}
      overwrite
    />
  )
})


/**
 * @description Masked Input for No Number Mask
 * @param {*} props
 * @param {*} ref
 * @only accepts only alphabets not numbers
 * @returns NoNumberMask component
 */

export const NoNumberMask = forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={[/^[A-Za-z]+$/]}
      inputRef={ref}
      onAccept={(value) => {
          onChange({ target: { value, name: props.name } })
      }}
      overwrite
    />
  )
})


/**
 * @description Masked Input for Phone Number
 * @param {*} props
 * @param {*} ref
 * @only accepts numbers max 10 digits and no 0 at the start
 * @to @change the mask to accept more than 10 digits,
 *  change the mask value to number of digits you want
 * @returns PhoneMask component
 */
export const PhoneMask = forwardRef(function PhoneMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000000000000"
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

/**
 * @description Masked Input for OTP
 * @param {*} props
 * @param {*} ref
 * @only accepts numbers max 4 digits
 * @to @change the mask to accept more than 4 digits,
 *  change the mask value to number of digits you want
 * @returns otpMask component
 */
export const otpMask = forwardRef(function otpMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000"
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});


/**
 * @description Masked Input for credit card/ debit card
 * @param {*} props
 * @param {*} ref
 * @only accepts numbers max 16 digits
 * @to @change the mask to accept more than 16 digits,
 * change the mask value to number of digits you want
 * @returns cardMask component
 */

export const cardMask = forwardRef(function cardMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000 0000 0000 0000"
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

/**
 * @description Masked Input for credit card/ debit card expiry date
 * @param {*} props
 * @param {*} ref
 * @only accepts numbers max 4 digits
 * @to @change the mask to accept more than 4 digits,
 * change the mask value to number of digits you want
 * @returns cardExpiryMask component
 * @example 12/22
 * @should be in the format MM/YY and should not be in the past date and month should not be greater than 12
 */

export const cardExpiryMask = forwardRef(function cardExpiryMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

/**
 * @description Masked Input for credit card/ debit card CVV
 * @param {*} props
 * @param {*} ref
 * @only accepts numbers max 4 digits
 * @to @change the mask to accept more than 4 digits,
 * change the mask value to number of digits you want
 * @returns cardCvvMask component
 * @example 123
 */

export const cardCvvMask = forwardRef(function cardCvvMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000"
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

/**
 * @description Masked Input for amount input
 * @param {*} props
 * @param {*} ref
 * @only accepts numbers and decimal point
 * @returns amountMask component
 */

export const amountMask = forwardRef(function amountMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      radix="."
      mask={Number}
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});


/**
 * @description Masked Input for Number input
 * @param {*} props
 * @param {*} ref
 * @only accepts whole numbers
 * @returns NumberMask component
 */

export const NumberMask = forwardRef(function NumberMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Number}
      definitions={{ '#': /[1-9]/, }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

/**
 * @description Masked Input For Age input
 * @param {*} props
 * @param {*} ref
 * @only accepts whole numbers
 * @returns AgeMask component
 * @example 18
 */

export const AgeMask = forwardRef(function AgeMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={[/^[1-9][0-9]{0,1}$/]}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

/**
 * @description Masked Input for Student ID
 * @param {*} props
 * @param {*} ref
 * @only accepts only alphabets not numbers at the start
 * @returns StudentID component
 */

export const StudentID = forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={[/^[A-Za-z][A-Za-z0-9]{0,19}$/]}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { value, name: props.name } })}
      overwrite
    />
  )
})


export function removeSpacesFromNumber(numberWithSpaces) {
  const stringWithoutSpaces = numberWithSpaces.toString().replace(/\s/g, '');
  return parseFloat(stringWithoutSpaces);
}

const numberWithSpaces = 100000 // 1 000 000;  This is just an example number with spaces
const numberWithoutSpaces = removeSpacesFromNumber(numberWithSpaces);
