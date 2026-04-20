import { categories } from "../data/categories";
import {v4 as uuidv4} from 'uuid'
import type { ActivityActions } from "../reducers/activityReducer";
import type { Activity } from "../types";
import { useState, type Dispatch, useEffect } from "react";
import type { ActivityState } from '../reducers/activityReducer';

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialSatate : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0,
}


export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialSatate);

    useEffect(()=>{
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            if(selectedActivity){
                setActivity(selectedActivity);
            }
        }
    },[state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const isNumberField  = ['category', 'calories'].includes(e.target.id);

        console.log(isNumberField);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value
        })
    }

    const isValidActivity = () =>{
        const { name, calories} = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        setActivity({
            ...initialSatate,
            id: uuidv4()
        })
    }

  return (
      <form
      className="space-y-5  bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select
        id="category"
        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        value={activity.category}
        onChange={handleChange}
        >
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name">Actividad:</label>
            <input 
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
             />
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias:</label>
            <input 
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. 200, 300, 400"
            value={activity.calories}
            onChange={handleChange}
             />
        </div>

        <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Agregar comida" : "Agregar actividad"}
        disabled={!isValidActivity()}
        />
      </form>
    
  )
}
