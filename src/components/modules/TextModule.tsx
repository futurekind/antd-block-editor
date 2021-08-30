import React, { FC } from 'react';
import { BlockEditorModule } from '../../utils/types';

export type TextModuleValueTape = string;

const TextModule: FC<BlockEditorModule<TextModuleValueTape>> = () => {
    return <span></span>;
};

export default TextModule;
