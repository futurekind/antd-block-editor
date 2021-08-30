import React, { FC } from 'react';
import { Layout } from 'antd';
import {
    AlignLeftOutlined,
    FontSizeOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import AntdBlockEditor from './components/AntdBlockEditor';
import HeadingModule, {
    HeadingModuleValueTape,
} from './components/modules/HeadingModule';
import TextModule, {
    TextModuleValueTape,
} from './components/modules/TextModule';

const MainView = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px;
`;

const App: FC = () => {
    const { Header, Content } = Layout;

    const Editor = AntdBlockEditor<
        HeadingModuleValueTape | TextModuleValueTape
    >();

    return (
        <Layout>
            <Header />

            <Content>
                <MainView>
                    <Editor
                        availableModules={[
                            <HeadingModule
                                key="heading"
                                icon={<FontSizeOutlined />}
                                tooltip="Heading"
                                value="Lorem Ipsum"
                            />,

                            <TextModule
                                key="text"
                                icon={<AlignLeftOutlined />}
                                tooltip="Text"
                            />,
                        ]}
                    />
                </MainView>
            </Content>
        </Layout>
    );
};

export default App;
