import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton
} from './styles'

import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'

// schema because it is a validation format for schema-based libraries 
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface is no longer necessary because above it already assumes the primitive type of the inputs
// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number,
// }

//  since it's not possible to reference my js variable inside the ts, I pass the type (typeof)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setaAtiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                )

                if (secondsDifference >= totalSeconds) {
                    setCycles((state) =>
                        state.map((cycle) => {
                            if (cycle.id == activeCycleId) {
                                return { ...cycle, finishedDate: new Date() }
                            } else {
                                return cycle
                            }
                        }),
                    )
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId])

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        // adds all previous cycles and then the new one via an arrow function
        setCycles((state) => [...cycles, newCycle])
        setaAtiveCycleId(id)
        setAmountSecondsPassed(0)

        reset();
    }

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id == activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )
        setaAtiveCycleId(null)
    }

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    const task = watch('task')
    const isSubmitDisable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <NewCycleForm />
                <Countdown />
                
                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <Play size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisable}>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}