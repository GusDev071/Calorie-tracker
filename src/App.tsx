import Form from "./Components/Form"

function App() {


  return (
    <>
      <header className="bg-lime-600 py-6">
        <div className="max-w-4xl mx-auto flex justify-between">
            <h1 className="text-center text-lg font-bold text-white uppercase">
                Contador de Calorías
            </h1>
        </div>
      </header>

      <section className="bg-yellow-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
           <Form />
        </div>
      </section>
    </>
  )
}

export default App
