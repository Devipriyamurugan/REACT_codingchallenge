import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function BookEdit(){
    const {isbn} =useParams()
    const navigate=useNavigate()
    
    

    const[title , setTitle]=useState('')
    const[author,setAuthor]=useState('')
    const[publicationYear,setPublicationYear]=useState('')

    useEffect(()=>
    {
        const token=localStorage.getItem('token')
        if(!token){
            alert('login first')
            navigate('/login')
            return
        }
        axios.get(`http://localhost:8080/books/${isbn}`, {
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        .then((res)=>{
            const book=res.data;
            setTitle(book.title)
            setAuthor(book.author)
            setPublicationYear(book.publicationYear)
        }).catch((error)=>{
            console.log('failed to load book',error)
            alert('failed to load the book details')
            navigate('/login')
        })
    },[isbn,navigate]);

    const handleUpdate=(e)=>{
        e.preventDefault();
        const token =localStorage.getItem('token')
        if(!token){
            alert('login first')
            navigate('/login')
            return
        }
        const updatedBook={
            isbn,
            title,
            author,
            publicationYear: parseInt(publicationYear, 10)
        }
        axios.put(`http://localhost:8080/books/${isbn}`, updatedBook,{
            headers: { Authorization: `Bearer ${token}` },

        })
        .then(()=>{
            alert('Book Updated Sucessfully')
            navigate('/books')
            
        })
        .catch((error)=>{
            console.error('failed to update book:' , error)
            alert('failed to update books')
        })
    }
    return(<div className="container">
        <h2>Edit Books</h2>
        <form onSubmit={handleUpdate}><input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
        <input type="text" placeholder="Author" value={author} onChange={(e)=>setAuthor(e.target.value)} required/>
        <input type="text" placeholder="Publication Year" value={publicationYear} onChange={(e)=>setPublicationYear(e.target.value)} required/>
        <button type="submit" >Update Book</button>


        </form>

    
    
    
    </div>)


}
export default BookEdit