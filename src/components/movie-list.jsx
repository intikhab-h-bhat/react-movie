import React,{useState,useEffect} from 'react';
import MovieItems from './movie-item';
import ReactPaginate from 'react-paginate';



const MovieList=()=>{
const[movies,setMovies]=useState(null);
const[moviesCount,setMoviesCount]=useState(0);
const[page,setPage]=useState(0);

useEffect(()=>{
        getMovies();
},[page])

const getMovies=()=>{
    fetch(process.env.REACT_APP_API_URL+"/movie?pageSize="
        + process.env.REACT_APP_PAGING_SIZE+"&pageIndex="+page)
        .then(res=>res.json())
        .then(res=> {
            if(res.status===true && res.data.count>0)
            {   
            setMovies(res.data.movies)
            setMoviesCount(Math.ceil(res.data.count)/process.env.REACT_APP_PAGING_SIZE)
        }
            if(res.data.count===0){
                alert("There is no movie data in system");
            }

        }).catch(err=>err);
}       

const handlePageClick=(pageIndex)=>{

    setPage(pageIndex.selected);

}

    return(
            <>
            {movies&& movies !==[]?
            movies.map((m,i)=> <MovieItems key={i} data={m}/>)
            : "Nothing"
            }
            <div className="d-flex justify-content-center">
                <ReactPaginate
                 previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 breakClassName={"page-link"}
                 pageCount={moviesCount}
                 marginPageDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={handlePageClick}
                 containerClassName={"pagination"}
                 pageClassName={"page-item"}
                 pageLinkCalssName={"page-link"}
                 previousCalssName={"page-link"}
                 nextCalssName={"page-link"}
                 activeCalssName={"active"}

                 />
            </div>
            </>
    );

};

export default MovieList;