import React from 'react'

function FormSecionTitle({firstTitle,SecondTitle}:any) {
  return (
    <div>
      <h1 className="text-xl font-bold">{firstTitle} <span className="text-[#312783]">{SecondTitle}</span></h1>
    </div>
  )
}

export default FormSecionTitle
