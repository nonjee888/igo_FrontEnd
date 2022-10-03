
export default function Tags({selected,handler,name}) {
   
    return (
        <div
        className="tag"
        style={selected ? {background:'#A3D7ED'} : {}}
        onClick={handler}>

            
        <span className="tag-text" style={selected ? {color:'#000'} : {}}>{name}</span>
        </div>
    )
}