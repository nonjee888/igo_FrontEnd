
export default function Tags({selected,handler,name}) {
   
    return (
        <div
        className="tag"
        style={selected ? {background:`linear-gradient(to left, #F5C9E0 30%,#47AFDB) 70%`} : {}}
        onClick={handler}>

            
        <span className="tag-text" style={selected ? {color:'#fff'} : {}}>{name}</span>
        </div>
    )
}