import React, { FC, useState, useCallback } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { Block, BlockActions, BlockWithOutline } from './ui/Block';
import {
    BlockEditorModule,
    mapModuleToEditorState,
} from '../utils/types';
import { ReactElement } from 'react';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

interface BlockEditorProps<ModuleValue> {
    availableModules: ReactElement<BlockEditorModule<ModuleValue>>[];
    editorState?: Array<
        Pick<BlockEditorModule<ModuleValue>, 'value' | 'name' | 'key'>
    >;
    onChange?: (
        editorState: Array<
            Pick<
                BlockEditorModule<ModuleValue>,
                'value' | 'name' | 'key'
            >
        >
    ) => void;
}

const AntdBlockEditor = <ModuleValue extends any>() => {
    const Instance: FC<BlockEditorProps<ModuleValue>> = ({
        availableModules,
        editorState,
        onChange,
    }) => {
        const [modules, setModules] = useState(editorState || []);

        const handleAddModule = useCallback(
            (
                module: ReactElement<BlockEditorModule<ModuleValue>>
            ) => {
                setModules((prev) => {
                    const result = [
                        ...prev,
                        {
                            ...module.props,
                            key: prev.length + 1,
                        },
                    ];
                    if (onChange)
                        onChange(result.map(mapModuleToEditorState));
                    return result;
                });
            },
            [onChange]
        );

        const handleMoveModule = useCallback(
            (currentIndex: number, dir: number) => {
                const nextIndex = currentIndex + dir;

                setModules((prev) => {
                    const result = [...prev];

                    const [removed] = result.splice(currentIndex, 1);

                    result.splice(nextIndex, 0, removed);

                    if (onChange)
                        onChange(result.map(mapModuleToEditorState));

                    return result;
                });
            },
            [onChange]
        );

        const handleDeleteModule = useCallback(
            (currentIndex: number) => {
                setModules((prev) => {
                    const result = [
                        ...prev.slice(0, currentIndex),
                        ...prev.slice(currentIndex + 1),
                    ];

                    if (onChange)
                        onChange(result.map(mapModuleToEditorState));
                    return result;
                });
            },
            [onChange]
        );

        const handleChangeModule = useCallback(
            (value: ModuleValue, index: number) => {
                setModules((prev) => {
                    const result = [
                        ...prev.slice(0, index),
                        {
                            ...prev[index],
                            value,
                        },
                        ...prev.slice(index + 1),
                    ];

                    if (onChange)
                        onChange(result.map(mapModuleToEditorState));

                    return result;
                });
            },
            [onChange]
        );

        return (
            <>
                {modules &&
                    modules.map(({ key, name, value }, index) => {
                        const module = availableModules.find(
                            (module) => module.props.name === name
                        );

                        if (!module) return null;

                        const Module = module.type;

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

                                <Module
                                    {...module.props}
                                    key={key}
                                    value={value}
                                    onChange={(
                                        moduleValue: ModuleValue
                                    ) =>
                                        handleChangeModule(
                                            moduleValue,
                                            index
                                        )
                                    }
                                />
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
