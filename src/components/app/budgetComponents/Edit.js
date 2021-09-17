import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

// HOC
const isLoading = (pending) => Component => (props) => {
    if (pending) {
        return <div>Ładuje dane</div>
    }

    return <Component {...props} />
}


const Form = ({ id }) => {
    return <div>to jest form o id: {id}</div>
}


const Edit = () => {
    const { idItem } = useParams();
  //  const [data, setData] = useState();

  //  const { data, status } = useFetch("http://localhost:3005/budget")

    useEffect(() => {
        console.log("zmieniłem się")
    }, [idItem])

    const Comp = isLoading(false)(Form)

    return (
        <Comp id={"dupa"} />
    )
}

export default Edit


