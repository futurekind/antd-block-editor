import React, { FC, useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { Block, BlockActions, BlockWithOutline } from './ui/Block';
import { BlockEditorModule } from '../utils/types';
import { ReactElement } from 'react';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

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

        const handleAddModule = (
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

        const handleMoveModule = React.useCallback(
            (currentIndex: number, dir: number) => {
                const nextIndex = currentIndex + dir;

                setModules((prev) => {
                    const result = [...prev];

                    const [removed] = result.splice(currentIndex, 1);

                    result.splice(nextIndex, 0, removed);

                    // if (onChange)
                    //     onChange({
                    //         modules: result,
                    //     } as any);
                    return result;
                });
            },
            []
        );

        const handleDeleteModule = React.useCallback(
            (currentIndex: number) => {
                setModules((prev) => {
                    const result = [
                        ...prev.slice(0, currentIndex),
                        ...prev.slice(currentIndex + 1),
                    ];

                    // if (onChange)
                    //     onChange({
                    //         modules: result,
                    //     } as any);
                    return result;
                });
            },
            []
        );

        return (
            <>
                {modules &&
                    modules.map(({ key, module }, index) => {
                        return (
                            <BlockWithOutline key={key}>
                                <BlockActions>
                                    <Popconfirm
                                        title="Wollen Sie diese Komponente wirklich entfernen?"
                                        onConfirm={() => {
                                            handleDeleteModule(index);
                                            return true;
                                        }}
                                        onCancel={() => false}
                                        okText="Ja"
                                        cancelText="Nein"
                                    >
                                        <Button
                                            icon={<DeleteOutlined />}
                                            type="primary"
                                            size="small"
                                        />
                                    </Popconfirm>

                                    <Button
                                        icon={<ArrowUpOutlined />}
                                        type="primary"
                                        size="small"
                                        disabled={index === 0}
                                        onClick={() => {
                                            handleMoveModule(
                                                index,
                                                -1
                                            );
                                        }}
                                    />

                                    <Button
                                        icon={<ArrowDownOutlined />}
                                        type="primary"
                                        size="small"
                                        disabled={
                                            index ===
                                            modules.length - 1
                                        }
                                        onClick={() => {
                                            handleMoveModule(
                                                index,
                                                1
                                            );
                                        }}
                                    />
                                </BlockActions>

                                {module}
                            </BlockWithOutline>
                        );
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
                                            handleAddModule(module)
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
