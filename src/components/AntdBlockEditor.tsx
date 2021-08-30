import React, { FC, useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { Block } from './ui/Block';
import { BlockEditorModule } from '../utils/types';
import { ReactElement } from 'react';

interface BlockEditorProps<ModuleValue> {
    availableModules: ReactElement<BlockEditorModule<ModuleValue>>[];
    initialModules?: Array<{
        key: string | number;
        module: ReactElement<BlockEditorModule<ModuleValue>>;
    }>;
}

const AntdBlockEditor = <ModuleValue extends any>() => {
    const Instance: FC<BlockEditorProps<ModuleValue>> = ({
        availableModules,
        initialModules,
    }) => {
        const [modules, setModules] = useState(initialModules || []);

        const addModule = (
            module: ReactElement<BlockEditorModule<ModuleValue>>
        ) => {
            setModules((prev) => {
                return [
                    ...prev,
                    {
                        key: prev.length + 1,
                        module,
                    },
                ];
            });
        };

        return (
            <>
                {modules &&
                    modules.map(({ key, module }) => {
                        return <Block key={key}>{module}</Block>;
                    })}

                <Block center>
                    <Space>
                        {availableModules.map((module) => {
                            const {
                                props: { icon, tooltip },
                                key,
                            } = module;

                            return (
                                <Tooltip title={tooltip} key={key}>
                                    <Button
                                        size="large"
                                        icon={icon}
                                        onClick={() =>
                                            addModule(module)
                                        }
                                    />
                                </Tooltip>
                            );
                        })}
                    </Space>
                </Block>
            </>
        );
    };

    return Instance;
};

export default AntdBlockEditor;
