import React, {
    FC,
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { BlockEditorModule } from '../../utils/types';

const View = styled.ul`
    background-color: #f5f5f5;

    input {
        padding: 10px;
        border: none;
        width: 100%;
        background: #f5f5f5;
        font-size: inherit;
        font-weight: inherit;

        &:focus {
            outline: none;
        }
    }
`;

const Item = styled.li`
    border-bottom: 2px solid #fff;

    &:last-child {
        border-bottom: none;
    }
`;

export type ListModuleValueType = {
    items: string[];
    type: 'ordered' | 'unordered';
};

const getRandom = () =>
    Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

const ListModule: FC<BlockEditorModule<ListModuleValueType>> = ({
    value,
    onChange,
}) => {
    const [focus, setFocus] = useState(
        value?.items ? value.items.length - 1 : -1
    );
    const [items, setItems] = useState<
        { key: string; value: string }[]
    >(
        value
            ? value?.items.map((x) => ({
                  key: getRandom().toString(),
                  value: x,
              }))
            : []
    );
    const ref = useRef<HTMLUListElement>(null);

    const handleKeyPress = useCallback(
        (currentIndex: number) =>
            (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    setItems((prev) => {
                        return [
                            ...prev.slice(0, currentIndex + 1),
                            {
                                key: getRandom().toString(),
                                value: '',
                            },
                            ...prev.slice(currentIndex + 1),
                        ];
                    });

                    setTimeout(() => {
                        setFocus(currentIndex + 1);
                    }, 80);
                }

                if (e.key === 'ArrowDown') {
                    const nextIndex = currentIndex + 1;
                    if (nextIndex < items.length) {
                        setFocus(nextIndex);
                    } else {
                        setFocus(0);
                    }
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const nextIndex = currentIndex - 1;
                    if (nextIndex >= 0) {
                        setFocus(nextIndex);
                    } else {
                        setFocus(items.length - 1);
                    }
                }

                if (e.key === 'Backspace') {
                    const value = e.currentTarget.value;

                    if (value === '') {
                        setItems((prev) => {
                            if (prev.length > 1) {
                                return [
                                    ...prev.slice(0, currentIndex),
                                    ...prev.slice(currentIndex + 1),
                                ];
                            } else {
                                return prev;
                            }
                        });

                        setTimeout(() => {
                            setFocus(
                                currentIndex - 1 > 0
                                    ? currentIndex - 1
                                    : 0
                            );
                        }, 80);
                    }
                }
            },
        [items]
    );

    useEffect(() => {
        if (ref.current) {
            const inputs = ref.current.querySelectorAll('input');

            if (inputs && inputs[focus]) {
                inputs[focus].focus();
            }
        }
    }, [focus, ref]);

    return (
        <View ref={ref} as={value?.type === 'ordered' ? 'ol' : 'ul'}>
            {items.map((item, index) => {
                return (
                    <Item key={item.key}>
                        <input
                            type="text"
                            defaultValue={item.value}
                            onFocus={() => setFocus(index)}
                            onBlur={(e) => {
                                setFocus(-1);
                                setItems((prev) => {
                                    const data = [
                                        ...prev.slice(0, index),
                                        {
                                            ...prev[index],
                                            value: e.target.value,
                                        },
                                        ...prev.slice(index + 1),
                                    ];

                                    if (onChange)
                                        onChange({
                                            items: data.map(
                                                (d) => d.value
                                            ),
                                            type:
                                                value?.type ||
                                                'unordered',
                                        });

                                    return data;
                                });
                            }}
                            onKeyDown={handleKeyPress(index)}
                        />
                    </Item>
                );
            })}
        </View>
    );
};

export default ListModule;
