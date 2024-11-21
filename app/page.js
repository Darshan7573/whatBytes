'use client'

import { useState } from "react"
import NavBar from "./components/NavBar"
import ProgressBars from "./components/QuestionAnalysis"
import SideBar from "./components/SideBar"
import SkillTest from "./components/SkillTest"

const Page = () => {

  const [questions, setQuestions] = useState(0);

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row">
        <SideBar />
        <SkillTest questions={questions} setQuestions={setQuestions} />
        <ProgressBars questions={questions} />
      </div>
    </>
  )
}

export default Page
