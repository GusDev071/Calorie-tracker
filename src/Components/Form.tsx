import { categories } from "../data/categories";
import { useState } from "react";


export default function Form() {
    const [activity, setActivity] = useState({
        category: '',
        name: '',
        calories: 0,
    });
  return (
      <form
      className="space-y-5  bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select
        id="category"
        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        value={activity.category}
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
             />
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias:</label>
            <input 
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. 200, 300, 400"
             />
        </div>

        <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value={"Guardar comida o ejercicio"}/>
      </form>
    
  )
}
