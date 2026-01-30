import React from 'react'

export  function Compoment() {
  const object = {name:'test',password:'test'}
  const [name,password] = object 

  arr = [1,2,3,4,5]
  const [a,b,rest] = arr
  arr.map(item=>{
    if (item % 2 ==0){
      return item
    }
  })
  arr.filter(item=>item % 2 ==0)
  arr.reduce((acc,curr)=>acc+curr,0)
  return (
    <>
    <div>
      hello
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
