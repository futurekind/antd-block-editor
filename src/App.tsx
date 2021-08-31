import React, { FC } from 'react';
import { Layout } from 'antd';
import {
    AlignLeftOutlined,
    FontSizeOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import AntdBlockEditor from './components/AntdBlockEditor';
import HeadingModule, {
    HeadingModuleValueType,
} from './components/modules/HeadingModule';
import TextModule, {
    TextModuleValueType,
} from './components/modules/TextModule';

const MainView = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px;
`;

const App: FC = () => {
    const { Header, Content } = Layout;

    const Editor = AntdBlockEditor<
        HeadingModuleValueType | TextModuleValueType
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
                                name="heading"
                                icon={<FontSizeOutlined />}
                                tooltip="Heading"
                                initialValue="Lorem Ipsum"
                            />,

                            <TextModule
                                key="text"
                                name="text"
                                icon={<AlignLeftOutlined />}
                                tooltip="Text"
                                initialValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit. 

Perspiciatis molestias, magni delectus consectetur rem cupiditate provident ex quidem labore alias in, omnis magnam officiis maxime, maiores eum neque numquam molestiae!`}
                            />,
                        ]}
                        editorState={[
                            {
                                key: 'a',
                                name: 'heading',
                                initialValue: 'Lorem',
                            },
                            {
                                key: 'b',
                                name: 'text',
                                initialValue:
                                    'Perspiciatis molestias, magni delectus consectetur rem cupiditate provident ex quidem labore alias in, omnis magnam officiis maxime, maiores eum neque numquam molestiae!',
                            },
                        ]}
                        onChange={(x) => console.table(x)}
                    />
                </MainView>
            </Content>
        </Layout>
    );
};

export default App;
