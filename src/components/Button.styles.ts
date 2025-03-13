import styled, { css } from 'styled-components'

type ButtomVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    variant?: ButtomVariant;
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    ${props => {
        return css`
            background-color: ${buttonVariants[props.variant]}
        `
    }}
`