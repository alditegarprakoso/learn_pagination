import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from "react-paginate";

function UserList() {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        getUsers()
    }, [page, keyword])

    const getUsers = async () => {
        const response = await axios.get(`http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`)
        setUsers(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
    }

    const changePage = ({ selected }) => {
        setPage(selected)
        if (selected == 9) {
            setMessage("Jika tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci spresifik")
        } else {
            setMessage("")
        }
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
        setMessage("")
    }

  return (
    <div className="container mt-5">
        <div className="columns">
            <div className="column is-center">
                <form onSubmit={searchData}>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="input" placeholder='Find something here...' />
                        </div>
                        <div className="control">
                            <button type="submit" className='button is-info'>Search</button>
                        </div>
                    </div>
                </form>
                <table className='table is-striped is-bordered is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index)=> {
                            return (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p>Total Rows: { rows } Page: { rows ? page + 1 : 0 } of { pages } </p>
                <p className='has-text-center has-text-danger text-center my-3'>{message}</p>
                <nav className="pagination is-centered" key={rows} role="navigation" aria-label="pagination">
                    <ReactPaginate
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        pageCount={Math.min(10, pages)}
                        onPageChange={changePage}
                        containerClassName={"pagination-list"}
                        pageLinkClassName={"pagination-link"}
                        previousLinkClassName={"pagination-previous"}
                        nextLinkClassName={"pagination-next"}
                        activeLinkClassName={"pagination-link is-current"}
                        disabledLinkClassName={"pagination-link is-disabled"}
                    />
                </nav>
            </div>
        </div>
    </div>
  )
}

export default UserList