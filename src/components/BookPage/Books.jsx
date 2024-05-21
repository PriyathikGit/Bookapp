import { useState } from "react"
import PropTypes from "prop-types"
import "./index.css"
import { FaStar } from "react-icons/fa"

const Book = ({ apiData }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const resultsPerPage = 10;


    const totalPages = Math.ceil(apiData.length / resultsPerPage)

    const displayedData = apiData.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    )

    const handlePageChange = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <h1 className="heading">Welcome to MyBook</h1>
            <div className="container">
                <div className="main-container">
                    <span className="serial-number">S.no</span>
                    <div className="author">Author name</div>
                    <div className="title">Title</div>
                    <div className="publish-year">Pusblished Date</div>
                    <div className="rating"> Star Rating
                    </div>
                </div>
            </div>
            <div>
                {displayedData.map((data, index) => (
                    <div key={index} className="container">
                        <div className="main-container">
                            <span className="serial-number">{(currentPage - 1) * resultsPerPage + index + 1}. </span>
                            <div className="serial">{data.author_name ? data.author_name : "unknown author"}</div>
                            <div className="title">{data.title}</div>
                            <div className="publish-year">{data.first_publish_year ? data.first_publish_year : "no data"}</div>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} color={i < data.ratings_average ? "gold" : "grey"} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
            <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                >
                    &lt; Prev
                </button>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                >
                     &gt; Next
                </button>
            </div>
        </>
    )
}

Book.propTypes = {
    apiData: PropTypes.array.isRequired,
  };


export default Book