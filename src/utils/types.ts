import { ReactNode } from 'react';

export interface BlockEditorModule<ModuleValue> {
    icon?: ReactNode;
    tooltip?: string;
    key: string | number;
    name: string;
    initialValue?: ModuleValue;
    onChange?: (value: ModuleValue) => void;
}

export const mapModuleToEditorState = ({
    key,
    initialValue,
    name,
}: BlockEditorModule<any>) => ({
    key,
    initialValue,
    name,
});
