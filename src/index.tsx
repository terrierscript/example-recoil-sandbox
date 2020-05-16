import React from "react"
import { render } from "react-dom"
import { ThemeProvider, CSSReset, Button, Box } from "@chakra-ui/core"
import { RecoilRoot, atom, useRecoilState } from "recoil"

const counter1 = atom({
  key: "conterA",
  default: 100,
})
const counter2 = atom({
  key: "conterB",
  default: 1,
})
const counter3 = atom({
  key: "conterA",
  default: 3,
})

let id = 1
const counterAtomGenerator = () => {
  id++
  return atom({
    key: `conter-${id}`,
    default: id ** 2,
  })
}

const AtomWithCounter = () => {
  const counterInnter = atom({
    key: "conterA",
    default: 3,
  })
  return <Counter recoilAtom={counterInnter} />
}

const Counter = ({ recoilAtom }) => {
  const [counter, setCounter] = useRecoilState(recoilAtom)
  return (
    <Box>
      <div>{recoilAtom.key}</div>
      <Button onClick={() => setCounter((x) => x + 1)}>{counter}</Button>
    </Box>
  )
}

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <CSSReset />
        <AtomWithCounter />
        <AtomWithCounter />
        <AtomWithCounter />

        <Counter recoilAtom={counterAtomGenerator()} />
        <Counter recoilAtom={counterAtomGenerator()} />
        <Counter recoilAtom={counterAtomGenerator()} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

const Counter1Value = () => {
  const [counter] = useRecoilState(counter1)
  return <div>{counter}</div>
}
render(<App />, document.querySelector("#root"))
