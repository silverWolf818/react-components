import React from 'react'

function App() {
    return (
        <div className="App">
            <form method='post' action="https://jsonplaceholder.typicode.com/posts" encType='multipart/form-data'>
                <input type="file" name='myFile'/>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
}

export default App;
