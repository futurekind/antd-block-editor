import React, { FC } from 'react';
import { BlockEditorModule } from '../../utils/types';

export type HeadingModuleValueTape = string;

const HeadingModule: FC<BlockEditorModule<HeadingModuleValueTape>> =
    () => {
        return <span></span>;
    };

export default HeadingModule;
