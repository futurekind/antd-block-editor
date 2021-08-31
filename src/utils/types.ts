import { ReactNode } from 'react';

export interface BlockEditorModule<ModuleValue> {
    icon?: ReactNode;
    tooltip?: string;
    key: string | number;
    name: string;
    initialValue?: ModuleValue;
}
