import { Input } from 'antd';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BlockEditorModule } from '../../utils/types';

const View = styled.article`
    padding: 10px;
    background-color: #f5f5f5;

    textarea {
        background: none;
        border: none;

        &:focus {
            border: none;
            box-shadow: none;
        }
    }
`;

export type TextModuleValueType = string;

const TextModule: FC<BlockEditorModule<TextModuleValueType>> = ({
    value,
    onChange,
}) => {
    const [val, setVal] = useState(value);

    return (
        <View>
            <Input.TextArea
                value={val}
                onChange={(e) => {
                    setVal(e.currentTarget.value);

                    if (onChange) onChange(e.currentTarget.value);
                }}
                autoSize
            />
        </View>
    );
};

export default TextModule;
