import React, { createContext, useState } from 'react'

export const QuarryContext=createContext()
function QuarryContextProvider(props) {
    const[filter, setFilter]=useState({})
    const[sort, setSort]=useState({})
    const [searchedQuarry, setSearchQuarry] = useState({})
    const [page, setPage] = useState(1)
    const [totalAmt, setTotalAmt] = useState(0)
    

  return (
    <QuarryContext.Provider value={{filter, setFilter,sort, setSort, searchedQuarry, setSearchQuarry,page, setPage,totalAmt, setTotalAmt}}>
         {props.children}
    </QuarryContext.Provider>
  )
}

export default QuarryContextProvider