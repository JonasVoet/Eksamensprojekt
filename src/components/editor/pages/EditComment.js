import React, {useState, useEffect} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Axios from 'axios';

 const EditComment = () => {
    const [comment, setComment] = useState();
    const [titel, setTitel] = useState('');
    const [kommentaren, setKommentaren] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        Axios.get('http://localhost:5033/kommentar/produkt/' + id)
            .then(res => {
                setComment(res.data);
                setTitel(res.data.titel);
                setKommentaren(res.data.kommentaren);
                console.log(res.data)
            })
    }, [id]);

    if (redirect) {
        return <Redirect to='/user' />
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titel', titel);
        formData.append('kommentaren', kommentaren);

        Axios.put('http://localhost:5033/kommentar/admin/' + id, formData, {withCredentials:true})
            .then(() => setRedirect(true));

            alert('Du har nu redigeret din kommentar');
    }




    return (
        <>
            {comment != null ?
            <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col-md-12 text-center">
                        <h2 className="mb-5">Rediger din kommentar</h2>
                        </div>

                    <div className="form-group offset-md-3 col-md-6">
                        <input type="text" defaultValue={titel} required className="form-control" placeholder="Title" name="Title" onChange={(e) => setTitel(e.target.value)}/>
                    </div>

                    
                    <div className="form-group offset-md-3 col-md-6">
                    <textarea defaultValue={kommentaren} required className="form-control" rows="6" placeholder="Content" name="Content" onChange={(e) => setKommentaren(e.target.value)}></textarea>
                    </div>

                    <div className="offset-md-3 col-md-6">
                            <button type="submit" className="btn btn-primary">Gem</button>
                        </div>
                        </div>
            </form>

        : "Loading..."}
        </>
    )
}


export default EditComment;
