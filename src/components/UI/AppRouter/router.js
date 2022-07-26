import MainPage from "../../MainPage/MainPage";
import Login from "../../LoginPage/LoginPage";
import SignInPage from "../../SignInPage/SignInPage";
import Profile from "../../Profile/Profile";
import MyArticles from "../../MyArticles/MyArticles";
import AddArticle from "../../AddArticle/AddArticle";
import ArticlePage from "../../ArticlePage/ArticlePage";


export const publicRoutes = [
  {path: '/login', element: <Login />, id: 0 },
  {path: '/sign-in', element: <SignInPage />, id: 1}
]

export const privateRoutes = [
  {path: '/', element: <MainPage />, id: 0},
  {path: '/main-page', element: <MainPage />, id: 1},
  {path: '/profile', element: <Profile />, id: 2},
  {path: '/my-article', element: <MyArticles />, id: 3},
  {path: '/add-article', element: <AddArticle />, id: 4},
  {path: '/article-page', element: <ArticlePage />, id: 5}
]