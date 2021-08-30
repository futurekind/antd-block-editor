import styled from 'styled-components';

export const Block = styled.div<{ center?: boolean }>`
    margin-bottom: 20px;
    padding: 12px;
    position: relative;
    background-color: #fff;
    text-align: ${({ center }) => (center ? 'center' : 'left')};

    &:last-of-type {
        margin-bottom: 0px;
    }
`;
