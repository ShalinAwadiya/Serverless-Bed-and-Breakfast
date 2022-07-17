import { Grid } from "@mui/material"
import "./Styles/style.css";

function AdminCmp(){
    return (

    <>
    <Grid>
        <Grid item >
            <div className="card-data-studio">
                <iframe width="70%" height="500" 
                    src="https://datastudio.google.com/embed/reporting/d1f0edb3-56e6-43ab-9e61-b582e07e0242/page/T2yxC" 
                     >
                </iframe>
            </div>
        
            
        </Grid>
    </Grid>
    </>
    )
}


export default function Admin() {
    return (
        <>
            <AdminCmp></AdminCmp>
        </>
    )
}