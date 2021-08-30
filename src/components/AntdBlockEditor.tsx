import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { Block } from './ui/Block';
import { BlockEditorModule } from '../utils/types';
import { ReactElement } from 'react';

interface BlockEditorProps {
    modules: ReactElement<BlockEditorModule>[];
}

const AntdBlockEditor: FC<BlockEditorProps> = ({ modules }) => {
    return (
        <>
            <Block center>
                {modules.map(({ props: { icon, tooltip }, key }) => {
                    return (
                        <Tooltip title={tooltip} key={key}>
                            <Button size="large" icon={icon} />
                        </Tooltip>
                    );
                })}
            </Block>
        </>
    );
};

export default AntdBlockEditor;
