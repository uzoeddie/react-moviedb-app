import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Main.scss';
// import Header from '../header/Header';
import MainContent from '../content/main-content/MainContent';
import Footer from '../footer/Footer';
import SearchResult from '../search/SearchResult';
import Spinner from '../loader/Spinner';

const Main = (props) => {
    const { searchResult } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="main">
            {/* <div className="header"><Header /></div> */}
            {
                loading ? <Spinner /> :
                <>
                    <div className="content">
                        {
                            searchResult && searchResult.length === 0 ?
                            <MainContent /> :
                            <SearchResult />
                        }
                    </div>
                    <div className="footer">
                        <Footer />
                    </div>
                </>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    searchResult: state.movies.searchResult,
    list: state.movies.list
});

export default connect(
    mapStateToProps,
    { }
)(Main);
