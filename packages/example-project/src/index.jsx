import React from "react"
import ReactDOM from "react-dom"
import DummyComponent from "./DummyComponent"

function App() {
	return <DummyComponent />
}

chayns.ready.then(() => {
	ReactDOM.render(<App />, document.querySelector("#app"))
})
