import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
    CountDownContainer,
    FormContainer,
    HomeContainer,
    Separator,
    TaskInput,
    MinutesAmountInput,
    StartCountDownButton
} from './styles'

// schema pq é um formato de validação das bibliotecas de schema based 
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface não é mais necessário porque acima já assume o tipo primitivo dos inputs
// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number,
// }

// como não é possível referenciar a minha variável js dentro do ts, eu passo o tipo (typeof)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);
        reset();

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