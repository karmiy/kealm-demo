import React, { useState, useCallback } from 'react';
import { ICheckboxWithLabelProps } from './interface';

const CheckboxWithLabel: React.FC<ICheckboxWithLabelProps> = props => {
    const [isChecked, setIsChecked] = useState(false);
    const { labelOn, labelOff } = props;

    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(() => setIsChecked(checked => !checked), []);
    
    return (
        <label>
            <input
                type='checkbox'
                checked={isChecked}
                onChange={onChange}
            />
            {isChecked ? labelOn : labelOff}
        </label>
    )
};

export default CheckboxWithLabel;

