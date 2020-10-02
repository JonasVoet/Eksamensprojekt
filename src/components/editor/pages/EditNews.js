import React, {useState, useEffect} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import Axios from 'axios';

 const EditNews = () => {
    const [news, setNews] = useState();
    const [titel, setTitel] = useState('');
    const [teaser, setTeaser] = useState('');
    const [nyhedstekst, setNyhedstekst] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        Axios.get('http://localhost:5033/nyheder/' + id)
            .then(res => {
                setNews(res.data);
                setTitel(res.data.titel);
                setTeaser(res.data.teaser);
                setNyhedstekst(res.data.nyhedstekst);
            })
    },[id]);

    if (redirect) {
        return <Redirect to='/' />
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titel', titel);
        formData.append('teaser', teaser);
        formData.append('nyhedstekst', nyhedstekst);
        formData.append('image', image);

        Axios.put('http://localhost:5033/nyheder/admin/' + id, formData, {withCredentials:true})
            .then(() => setRedirect(true));

            alert('Du har nu redigeret en nyhed');
    }

    const handleOnChange = (e) => {
        setImage(e[0])
        console.log(e);
    }

    return (
        <>
            {news != null ?
            <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input type="hidden" name="id" defaultValue={news._id} />
                        <input type="hidden" name="image" defaultValue={news.image} />
                        <div className="col-md-12 text-center">
                        <h2 className="mb-5">Rediger nyhed: {news.titel}</h2>
                        </div>

                    <div className="form-group offset-md-3 col-md-6">
                        <input type="text" defaultValue={titel} required className="form-control" placeholder="Title" name="Title" onChange={(e) => setTitel(e.target.value)}/>
                    </div>

                    
                    <div className="form-group offset-md-3 col-md-6">
                    <textarea defaultValue={teaser} required className="form-control" rows="6" placeholder="Content" name="Content" onChange={(e) => setTeaser(e.target.value)}></textarea>
                    </div>

                    <div className="form-group offset-md-3 col-md-6">
                    <textarea defaultValue={nyhedstekst} required className="form-control" rows="6" placeholder="Content" name="Content" onChange={(e) => setNyhedstekst(e.target.value)}></textarea>
                    </div>

                    <div className="offset-md-3 col-md-3 my-3">
                        <img src={`http://localhost:5033/images/${news.image}`} alt={` ${news.titel}`} className="img-fluid" />
                    </div>
                    <div className="col-md-3">
                        <ImageUploader
                            withIcon={false}
                            withPreview={true}
                            buttonText="Upload billede"
                            name="image"
                            type="file"
                            onChange={handleOnChange}
                            enctype="multipart/form-data"

                        />

                       
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

export default EditNews;
