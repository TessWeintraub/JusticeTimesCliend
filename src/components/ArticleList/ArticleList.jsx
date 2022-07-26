import React, { useEffect, useMemo, useState } from "react";
import Article from "../Article/Article";
import Button from "../UI/Button/Button";
import articleListClasses from "./ArticleList.module.css";
import SelectFilter from "../UI/SelectFilter/SelectFilter";
import * as queryString from "query-string";
import SelectSort from "../UI/SelectSort/SelectSort";
import Search from "../UI/Input/Input";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCategoriesAction, asyncGetPopularArticleAction } from "../../store/action";

const ArticleList = ({ location, allArticles, maxPage }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [sort, setSort] = useState('')
  const [activeFilter, setActiveFilter] = useState([])
  const [searchValue, setSearchValue] = useState({search: ''})
  const queryParam = queryString.parse(window.location.search)
  const categories = useSelector(state => state.categories)


  useEffect(()=>{
    dispatch(asyncGetCategoriesAction())
  },[])


  useEffect(()=>{
    queryParam.filter && setActiveFilter([queryParam.filter])
    queryParam.search && setSearchValue({search: queryParam.search})
    queryParam.sort === 'date' && setSort({name: 'По дате', key: 'date'})
    queryParam.sort === 'views_count' && setSort({name: 'По популярности', key: 'views_count'})
    queryParam.page && setCount(Number(queryParam.page))
  },[])


  const isDisabled = useMemo(() => {
    if (!maxPage) {
      return {
        prev: false,
        next: false
      }
    } else {
      return {
        next: !(count < maxPage),
        prev: count === 1
      }
    }
  }, [count, maxPage])



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [count])

  const onClickNextButton = () => {
    if(count + 1 <= maxPage){
      setCount((count) => count + 1);
      handlerClick(count+1)
    }
  }

  const onClickPrevButton = () => {
    setCount((count) => count - 1);
    handlerClick(count-1)
  }

  const handlerClick = (numberPage) => {
    const filterParam = activeFilter.length ? `&filter=${activeFilter.join(',')}` : ''
    const sortParam = sort ? `&sort=${sort.key}` : ''
    const searchParam = searchValue.search ? `search=${searchValue.search.toLowerCase()}` : ''
    const pageParam = numberPage > 1 ? `&page=${numberPage}` : ''
    navigate({search: `?${searchParam + sortParam + filterParam + pageParam}`})
    dispatch(asyncGetPopularArticleAction(`?${searchParam + sortParam + filterParam + pageParam}`))
  }

  return (
    <section className={articleListClasses[`article_list__article__list`]}>
      <h1 className={articleListClasses[`article__list__title`]}>
        Search
      </h1>
      <section className={articleListClasses[`article__list_search`]}>
          <SelectFilter
            allMethodsFiltering={categories}
            activeMethodFiltering={activeFilter}
            setActiveMethodFiltering={setActiveFilter}
            placeholder='#tag'
            label='Filter'
          />
        <SelectSort
          activeMethodSort={sort}
          setActiveMethodSort={setSort}
          placeholder='По дате'
          label='Sort'
        />
        <Search
          text="Search"
          name="search"
          placeholder="Enter a title"
          inputValue={searchValue}
          setInputValue={setSearchValue}
        />
        <Button
          name="Search"
          variant="contained__header"
          onClick={() => {
            handlerClick()
          }}
        />
      </section>
      <h1 className={articleListClasses[`article__list__title`]}>
        Articles
      </h1>
      <div>
        {allArticles?.map((myArticle) => (
          <Article
            key={myArticle.id}
            location={location}
            article={myArticle}
          />
        ))}
      </div>
      <div className={articleListClasses[`article__list__nav__button`]}>
        <Button
          variant={`outlined__header`}
          name="Prev"
          onClick={onClickPrevButton}
          isDisable={isDisabled.prev}
        />
        <Button
          variant={`outlined__header`}
          name="Next"
          onClick={onClickNextButton}
          isDisable={isDisabled.next}
        />
      </div>
    </section>
  );
};

export default ArticleList;
