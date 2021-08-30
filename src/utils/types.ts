import { ReactNode } from 'react';

export interface BlockEditorModule {
    icon: ReactNode;
    tooltip?: string;
    key: string | number;
}
