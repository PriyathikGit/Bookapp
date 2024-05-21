import Book from "../BookPage/Books"
import "./index.css"
import { useEffect, useState } from "react"
import Loader from "../../assets/Loader.gif"
const Header = () => {
    const [apiData, setApiData] = useState([])
    const [query, setQuery] = useState('the+lord+of+the+rings')
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}`)
            const data = await response.json();
            console.log(data)
            setApiData(data.docs);
            setLoading(false)
        }
        fetchData()
    }, [query])

    const handleSearch = (e) => {
        e.preventDefault()
        setQuery(searchTerm)
        setSearchTerm('')
    }
    
    return (
        <>
            <div className="header">
                <div className="text">
                    <h1>My BookSearch</h1>
                </div>
                <div className="searchDiv">
                    <form onSubmit={handleSearch}>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search here"
                        />
                        <button className="btn" type="submit">Search</button>
                    </form>
                </div>
            </div>
            {
                loading ? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <img src={Loader} alt="loader..." />
                </div> : <Book apiData={apiData}  />
            }
            
        </>
    )
}

export default Header