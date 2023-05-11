import { useState } from "react";

const ViewPdf = (props) => {
    // const [pdf, setPdf] = useState();
    // setPdf(props.pdfreader.notesFile);
    //console.log("inside pdf = " + pdf);
    if(props.pdfreader.notesFile === ""){
        return(null);
    }else{
        return (
            <div>
                <embed width="800" height="500" src={'data:application/pdf;base64,' + props.pdfreader.notesFile} className="rounded mx-auto d-block myProfile2"/>
            </div>
        )
    }

}

export default ViewPdf;