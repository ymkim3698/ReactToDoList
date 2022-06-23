

const ToDo = () => {
    return (
        <div className="to-do">
            <div className="header">
                <h1>ToDo</h1>
            </div>
            <div className="container">
                {list.map((item) => {
                    return <ToDoItem key={item.id} item={item} deleteItem={deleteItem} />;
                })}
            </div>
            <div className="to-do-input">
                <input>
                    
                </input>
            </div>
        </div>
    )
}


export default ToDo;