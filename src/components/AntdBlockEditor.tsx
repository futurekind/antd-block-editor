import React, { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { Block } from './ui/Block';
import { BlockEditorModule } from '../utils/types';
import { ReactElement } from 'react';

interface BlockEditorProps<ModuleValue> {
    modules: ReactElement<BlockEditorModule<ModuleValue>>[];
}

const AntdBlockEditor = <ModuleValue extends any>() => {
    const Instance: FC<BlockEditorProps<ModuleValue>> = ({
        modules,
    }) => {
        return (
            <>
                <Block center>
                    <Space>
                        {modules.map(
                            ({ props: { icon, tooltip }, key }) => {
                                return (
                                    <Tooltip
                                        title={tooltip}
                                        key={key}
                                    >
                                        <Button
                                            size="large"
                                            icon={icon}
                                        />
                                    </Tooltip>
                                );
                            }
                        )}
                    </Space>
                </Block>
            </>
        );
    };

    return Instance;
};

export default AntdBlockEditor;
