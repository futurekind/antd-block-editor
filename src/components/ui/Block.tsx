import styled from 'styled-components';

export const Block = styled.div<{ center?: boolean }>`
    margin-bottom: 12px;
    padding: 12px;
    position: relative;
    background-color: #fff;
    text-align: ${({ center }) => (center ? 'center' : 'left')};

    &:last-of-type {
        margin-bottom: 0px;
    }
`;

export const BlockActions = styled.div`
    display: none;
    padding: 2px;
    position: absolute;
    bottom: 100%;
    right: -3px;
    background-color: #1890ff;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.15);
    border-radius: 2px 2px 0 0;

    button[disabled] {
        background-color: #1890ff;
        border-color: #1890ff;
    }
`;

export const BlockWithOutline = styled(Block)`
    &:hover {
        outline: 2px solid #1890ff !important;

        .block__add-btn {
            display: inline-block;
        }

        ${BlockActions} {
            display: block;
        }
    }

    .block__add-btn {
        display: none;
        position: absolute;
        bottom: 0;
        left: 50%;
        z-index: 1;
        transform: translate3d(-50%, 50%, 0);
    }
`;
