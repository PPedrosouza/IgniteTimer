import styled from 'styled-components'

type ButtomVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    variant?: ButtomVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;

    background-color: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};
`