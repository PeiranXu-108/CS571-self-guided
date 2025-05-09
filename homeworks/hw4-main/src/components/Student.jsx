/* eslint-disable */
const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */
            <>
            <h5>{props.major}</h5>
            <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ? "" : "Not"} from Wisconsin</p>
            <ul>
                {props.interests.map((interests,index)=>(
                    <li key={interests}>{interests}</li>
                ))}
            </ul>
            </>
            }
    </div>
}


export default Student;