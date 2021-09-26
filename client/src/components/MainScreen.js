const MainScreen = () => {

    const todos = [
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:false},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'78a3hrn9c82hcha7c2938rg2637gnrcagrcg732gjd9732jg3gj98rgd79g3r789n7832grnac78gn78cgn73g2nc8gn3gnr', done:false},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:false},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:false},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:false},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:false},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true},
        {text:'some random text as if i have something to say or to state or whatever just get it done already', done:true}
    ];

    return (
        <div id="main-screen">
            <div className="todos">
                {todos.map((todo, idx) => (
                    <div className={`todo ${todo.done && 'done'}`} key={idx}>
                        <input type="checkbox" checked={todo.done} />
                        <span className='text'>{todo.text}</span>
                        <span className='delete'>&times;</span>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default MainScreen;