import React from 'react'

export  function Compoment() {
  const object = {name:'test',password:'test'}
  const {name: userName, password: userPassword} = object 

  const arr = [1,2,3,4,5]
  const [a, b, ...rest] = arr
  
  // Exemples de map, filter, reduce (non utilisés dans le rendu)
  const evensMap = arr.map(item => (item % 2 === 0 ? item : null))
  const evensFilter = arr.filter(item => item % 2 === 0)
  const sum = arr.reduce((acc, curr) => acc + curr, 0)
  
  return (
    <>
    <div>
      <p>hello</p>
      <p>User: {userName}</p>
      <p>Sum: {sum}</p>
    </div>
    <Compoment2 />
    </>
  )
}
export  function Compoment2() {
  return (
    <>
    <div>
      compoment 
    </div>
    
     </>
  )
}
export  function Compoment3(title1,title2,title3) {
  return (
   <>
   <h1>{title1}</h1>
   <h1>{title2}</h1>
   <h1>{title3}</h1>  
   </>
  )
}
