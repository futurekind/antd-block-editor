import React, { FC } from 'react';
import { Layout } from 'antd';
import {
    AlignLeftOutlined,
    FontSizeOutlined,
    OrderedListOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import AntdBlockEditor from './components/AntdBlockEditor';
import HeadingModule, {
    HeadingModuleValueType,
} from './components/modules/HeadingModule';
import TextModule, {
    TextModuleValueType,
} from './components/modules/TextModule';
import ListModule, {
    ListModuleValueType,
} from './components/modules/ListModule';

const MainView = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px;
`;

const App: FC = () => {
    const { Header, Content } = Layout;

    const Editor = AntdBlockEditor<
        | HeadingModuleValueType
        | TextModuleValueType
        | ListModuleValueType
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
                                value="Lorem Ipsum"
                            />,

                            <TextModule
                                key="text"
                                name="text"
                                icon={<AlignLeftOutlined />}
                                tooltip="Text"
                                value={`Lorem ipsum dolor sit amet consectetur adipisicing elit. 

Perspiciatis molestias, magni delectus consectetur rem cupiditate provident ex quidem labore alias in, omnis magnam officiis maxime, maiores eum neque numquam molestiae!`}
                            />,

                            <ListModule
                                key="list"
                                name="unorderedList"
                                icon={<UnorderedListOutlined />}
                                value={{
                                    items: [
                                        'Punkt 1 (zum Entfernen löschen Sie den kompletten Text)',
                                        'Punkt 2 (Weitere Punkte fügen Sie über die <Enter>-Taste hinzu)',
                                    ],
                                    type: 'unordered',
                                }}
                            />,

                            <ListModule
                                key="list"
                                name="orderedList"
                                icon={<OrderedListOutlined />}
                                value={{
                                    items: [
                                        'Punkt 1 (zum Entfernen löschen Sie den kompletten Text)',
                                        'Punkt 2 (Weitere Punkte fügen Sie über die <Enter>-Taste hinzu)',
                                    ],
                                    type: 'ordered',
                                }}
                            />,
                        ]}
                        editorState={[
                            {
                                key: 'a',
                                name: 'heading',
                                value: 'Lorem',
                            },
                            {
                                key: 'b',
                                name: 'text',
                                value: 'Perspiciatis molestias, magni delectus consectetur rem cupiditate provident ex quidem labore alias in, omnis magnam officiis maxime, maiores eum neque numquam molestiae!',
                            },
                            {
                                key: 'c',
                                name: 'unorderedList',
                                value: {
                                    items: ['Lorem', 'Ipsum'],
                                    type: 'unordered',
                                },
                            },
                        ]}
                        onChange={(x) => console.log(x)}
                    />
                </MainView>
            </Content>
        </Layout>
    );
};

export default App;
