

const getMovies=async()=>{

   await fetch("http://localhost:7160/api/Movie?pageIndex=0&pageSize=10",{method:"GET"})
    .then(res=> res.json())
    .then(res=>console.log(res));

    //return await Response;



}
getMovies();
