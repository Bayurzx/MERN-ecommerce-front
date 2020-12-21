import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, search, results, searched, category } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setData({...data, categories: data})
      }
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const searchData = () => {
    // console.log(search, category)
    if (search) {
      list({ search: search || undefined, category: category })
      .then(response => {
        if (response.error) {
          console.log(response.error)
        } else {
          setData({ ...data, results: response, searched: true })
        }
      })
    }

  }

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData()
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false })
  }

  const searchMessage = (searched, results) => {
    if (searched && results.length > 1) {
      return `Found ${results.length} products in search`
    }
    if (searched && results.length === 1) {
      return `Found ${results.length} product in search`
    }
    if (searched && results.length < 1) {
      return `Found no products in search`
    }
  }

  const searchedProducts = (results = []) => {

    return (
      <div>
        <h2 className="mb-4 mt-4">{ searchMessage(searched, results) }</h2>
        <div className="row">
          {results.map((p, i) => (
            <Card key={i} product={p} />
          ))}
        </div>

      </div>
    )
  }

  const searchForm = () => (
    <form action="" onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Pick Category</option>
              {categories.map((c, i) => (
                <option value={c._id} key={i}>{c.name}</option>
              ))}
            </select>
          </div>
          <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search by name"/>
        </div>
        <div className="btn input-group-append" style={{border:"none"}}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  )

  return (
    <div className="row">
      <div className="container">
        {searchForm()}
      </div>
      <div className="container-fluid mb-3">
        {searchedProducts(results)}
      </div>
    </div>
  )
};

export default Search;
