import { Play } from 'phosphor-react'

import {
    CountDownContainer,
    FormContainer,
    HomeContainer,
    Separator,
    TaskInput,
    MinutesAmountInput,
    StartCountDownButton
} from './styles'

export function Home() {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list='task-suggestion' placeholder="Dê um nome para o seu projeto" />

                    <datalist id='task-suggestion'>
                        <option value="Projeto 1"></option>
                        <option value="Projeto 4"></option>
                        <option value="Projeto 3"></option>
                        <option value="Banana"></option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}