import React, {useEffect} from "react";

import Article from "../Article/Article";
import ArticleList from "../ArticleList/ArticleList";

import mainClasses from "./MainPage.module.scss";
import preloader from "../../assets/Pulse-1s-200px.svg"
import {useDispatch, useSelector} from "react-redux";
import {
  asyncGetAllArticlesAction,
  asyncGetPopularArticleAction
} from "../../store/action";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MainPage = () => {
  const dispatch = useDispatch()
  const allArticles = useSelector(state => state.all)
  const popularArticle = useSelector(state => state.popular)
  const { isLoading } = useSelector(state => state.auth)

  useEffect( () => {
    window.scrollTo(0, 0)
    !allArticles.items?.length && dispatch(asyncGetAllArticlesAction())
    !popularArticle && dispatch(asyncGetPopularArticleAction())
  }, [])


  return (
      <>
        <Header/>
        <main className={mainClasses.main}>
          {
            isLoading
              ?
                <img src={preloader} alt="Loading..."/>
              :
                allArticles.items.length
                  ?
                  <>
                    {/*<Article location="main_page" article={popularArticle}/>*/}
                    <ArticleList location="article_list" allArticles={allArticles.items} maxPage={allArticles.meta?.totalPages}/>
                  </>
                  :
                  <img src={preloader} alt="Loading..."/>
          }
        </main>
        <Footer/>
      </>
  );
};

export default MainPage;
