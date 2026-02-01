export default function CategoryCard({name,onclick}){
return(
<button onClick={onclick} style={{padding:"12px 16px",borderRadius:"6px",border:"1px solid #ccc",cursor:"pointer",}}>{name}</button>
)
}