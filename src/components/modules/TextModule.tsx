import React, { FC } from 'react';
import { BlockEditorModule } from '../../utils/types';

export type TextModuleValueType = string;

const TextModule: FC<BlockEditorModule<TextModuleValueType>> = () => {
    return <span></span>;
};

export default TextModule;
