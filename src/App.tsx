import {useReducer, useEffect, useMemo} from 'react'
import Form from "./Components/Form"
import { activityReducer, initialState } from './reducers/activityReducer'
import ActivityList from './Components/ActivityList'
import CalorieTracker from './Components/CalorieTracker'

function App() {
  const [state , dispatch] = useReducer(activityReducer, initialState)

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp = useMemo(()=> state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-center text-lg font-bold text-white uppercase">
                Contador de Calorías
            </h1>
            <button 
            onClick={() => dispatch({type: 'restart-app'})}
            disabled={!canRestartApp}
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10">
                Reiniciar Aplicación
            </button>
        </div>
      </header>

      <section className="bg-yellow-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
           <Form 
             dispatch={dispatch}
             state={state}
           />
        </div>
      </section>
      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker 
            activities={state.activities}
          />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList 
        activities={state.activities} 
        dispatch = {dispatch}
        />
      </section>
    </>
  )
}

export default App
