import React, {useState, useEffect } from 'react'

// The project uses redux but I am not using redux here for this component
// because it's a very simple componnent
// which is not dependent on any other components
const FastaFileList = () => {

    const [demoFastas, setDemoFastas] = useState([]);

    const getDemoFastas = () => {
        fetch('demo-files.json', {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
        .then(response => response.json())
        .then(demoFastas => setDemoFastas(demoFastas))
        .catch(error => console.error(error));
    }

    useEffect(()=>{
        getDemoFastas()
    },[])

    return !demoFastas || demoFastas.length == 0
        ? <p>Could not load demo fasta files</p>
        : <ul className="list-group">
            {
                demoFastas && demoFastas.length > 0 && demoFastas.map((demoFasta, sn) =>
                    <li key={sn} className="list-group-item">
                        <a href={"?input-fasta=" + demoFasta.link}>{demoFasta.name}</a>
                    </li>
                )
            }
        </ul>
}

export default FastaFileList
