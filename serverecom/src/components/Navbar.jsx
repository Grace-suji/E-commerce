  import React ,{useState} from 'react'
  import { Link } from 'react-router-dom'

  const Navbar = ({ handleSearch }) => {
    const [searchterm, setSearchterm]=useState('')
     const handlesubmit=(e)=>{
      e.preventDefault()
      handleSearch(searchterm)
     }
    return (
      <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand text-light" href="#">Shop</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active text-light" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
          <Link to='/Cart' className='nav-link text-light'>🛒Cart</Link>
          </li>
        </ul>
        <form class="d-flex" onSubmit={handlesubmit}>
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchterm} onChange={(e)=>setSearchterm(e.target.value)}/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
        
      </div>
    )
  }

  export default Navbar
