import { ReactNode } from 'react';

export interface BlockEditorModule<ModuleValue> {
    icon?: ReactNode;
    tooltip?: string;
    key: string | number;
    name: string;
    value?: ModuleValue;
    onChange?: (value: ModuleValue) => void;
}

export const mapModuleToEditorState = ({
    key,
    value,
    name,
}: BlockEditorModule<any>) => ({
    key,
    value,
    name,
});
