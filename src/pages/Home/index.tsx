import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
    CountDownContainer,
    FormContainer,
    HomeContainer,
    Separator,
    TaskInput,
    MinutesAmountInput,
    StartCountDownButton
} from './styles'

// controlled / uncontrolled

export function Home() {
    const { register, handleSubmit, watch } = useForm()

    function handleCreateNewCycle(data: any) {
        // event.target.task.value
    }

    const task = watch('task')
    const isSubmitDisable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list='task-suggestion'
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />

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
                        {...register('minutesAmount', { valueAsNumber: true })}
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

                <StartCountDownButton type="submit" disabled={isSubmitDisable}>
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}