import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BlockEditorModule } from '../../utils/types';

const View = styled.h2`
    padding: 10px;
    margin-bottom: 0;
    background-color: #f5f5f5;

    input {
        border: none;
        width: 100%;
        background: none;
        font-size: inherit;
        font-weight: inherit;

        &:focus {
            outline: none;
        }
    }
`;

export type HeadingModuleValueType = string;

const HeadingModule: FC<BlockEditorModule<HeadingModuleValueType>> =
    ({ value, onChange }) => {
        const [val, setVal] = useState(value);
        return (
            <View>
                <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                        setVal(e.currentTarget.value);
                        if (onChange) onChange(e.currentTarget.value);
                    }}
                />
            </View>
        );
    };

export default HeadingModule;
