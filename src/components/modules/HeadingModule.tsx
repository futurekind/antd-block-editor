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

export type HeadingModuleValueTape = string;

const HeadingModule: FC<BlockEditorModule<HeadingModuleValueTape>> =
    ({ value }) => {
        const [val, setVal] = useState(value);
        return (
            <View>
                <input
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.currentTarget.value)}
                    // onBlur={() => {
                    //     if (onSave) {
                    //         onSave(val);
                    //     }
                    // }}
                />
            </View>
        );
    };

export default HeadingModule;
