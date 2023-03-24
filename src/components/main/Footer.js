import {useState, useEffect, Fragment} from "react";
import axios from "axios";

function Footer(){
    const [newsList, setNewsList] = useState([])
    const [foodList, setFoodList] = useState([])
    const [recipeList, setRecipeList] = useState([])

    useEffect(()=>{
        axios.get('http://localhost/news/news_aop_react').then(response=>{
            console.log(response.data)
            setNewsList(response.data)
        })
        axios.get('http://localhost/jeju/food_top9').then(response=>{
            console.log(response.data)
            setFoodList(response.data)
        })
        axios.get('http://localhost/recipe/recipe_top9').then(response=>{
            console.log(response.data)
            setRecipeList(response.data)
        })
    },[])

    let news = newsList.map((news)=>
        <li><a href={news.link}>{news.title}</a></li>
    )
    let food = foodList.map((food)=>
        <li><a className="imgover" href="#"><img src={food.poster} /></a></li>
    )
    let recipe = recipeList.map((recipe)=>
        <li><a className="imgover" href="#"><img src={recipe.poster} /></a></li>
    )

    return(
        <Fragment>
        <div className="bgded overlay row4" style={{"background-image":"url('images/camp3.jpg')"}}>
            <footer id="footer" className="hoc clear">
                <div className="one_third first">
                    <h4 className="heading">오늘의 뉴스</h4>
                    <ul className="nospace linklist">
                        {news}
                    </ul>
                </div>
                <div className="one_third">
                    <h6 className="heading">오늘의 제주 맛집 Top 9</h6>
                    <ul className="nospace clear latestimg">
                        {food}
                    </ul>
                </div>
                <div className="one_third">
                    <h6 className="heading">오늘의 레시피 Top 9</h6>
                    <ul className="nospace clear latestimg">
                        {recipe}
                    </ul>
                </div>
            </footer>
        </div>
        <div className="wrapper row5">
            <div id="copyright" className="hoc clear">
                <p className="fl_left">Copyright &copy; 2023 03 - <a href="#">CampingZoa</a></p>
                <p className="fl_right">Template by 최선형</p>
            </div>
        </div>
        </Fragment>
    )
}
export default Footer;