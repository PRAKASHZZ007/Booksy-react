import {Component} from "react"
import {Link} from "react-router-dom"

import Header from "../Header";

import "./index.css"

class Home extends Component {
    render(){
        return (
            <div className = "home-container">
                <Header />
                <div className="banner-container">
                    <div className="banner-content-container">
                    <h1 className="banner-heading">Booksy</h1>
                  <p className="banner-text">
Booksy was founded in 1992 with a simple mission: to inspire lives through reading.  
From one store in New York to 92 locations across 32 cities in the United States, we’ve grown with our readers.  
Every shelf holds stories that educate, entertain, and empower.  
At Booksy, we celebrate curiosity, connection, and a shared love for books.
</p>

<p className="banner-text">
As the United States’ favorite destination for book lovers, we bring you a thoughtfully curated collection across genres.  
Our spaces invite you to explore, discover, and fall in love with reading all over again.  
We host events, author meets, and more—building a vibrant community around books.  
Booksy is your space to read, learn, and belong.
</p>


                        <Link to="/books" className="nav-link">
                            <button className="explore-button">Explore Books</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home