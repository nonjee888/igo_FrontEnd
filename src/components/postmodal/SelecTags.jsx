export default function SelecTags({selected,handler,region,name}) {
    console.log(region)
    
    
    return (
        <div
        className="tag"
        style={selected ? {background:`linear-gradient(to left, #F5C9E0 30%,#47AFDB) 70%`} : {}}
        onClick={handler}
        value={region}>

        <span className="tag-text" style={selected ? {color:'#fff'} : {}}>{name}</span>
        </div>
    )
}